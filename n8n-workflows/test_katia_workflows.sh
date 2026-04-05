#!/bin/bash
# ═══════════════════════════════════════
# KATIA.AI — Automated Test Suite
# Tests all 6 N8N workflows via webhooks
# ═══════════════════════════════════════

TOKEN="${KATIA_WEBHOOK_TOKEN:-katia_wh_2026_seguro}"
BASE="${N8N_WEBHOOK_URL:-http://localhost:5678/webhook}"
PASS=0
FAIL=0
TOTAL=0
RESULTS=""

test_result() {
  TOTAL=$((TOTAL + 1))
  if [ "$1" -eq 0 ]; then
    PASS=$((PASS + 1))
    RESULTS="$RESULTS\n  ✅ PASS: $2"
    echo "  ✅ PASS: $2"
  else
    FAIL=$((FAIL + 1))
    RESULTS="$RESULTS\n  ❌ FAIL: $2"
    echo "  ❌ FAIL: $2"
  fi
}

echo "═══════════════════════════════════════"
echo "KATIA.AI — Test Suite"
echo "Date: $(date +%Y-%m-%d\ %H:%M:%S)"
echo "Target: $BASE"
echo "═══════════════════════════════════════"

# ─── PRE-CHECK ───
echo ""
echo "▶ Pre-check: N8N connectivity"
HTTP=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/../healthz" 2>/dev/null)
if [ "$HTTP" = "000" ]; then
  echo "  ❌ N8N is not reachable at $BASE"
  echo "  Start N8N first, then re-run this script."
  exit 1
fi
echo "  ✅ N8N is reachable"

# ─── WF-01: LEAD CAPTURE ───
echo ""
echo "▶ WF-01: Lead Capture & Normalize"

# T1.1: Valid lead - full data
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-lead-capture" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"name":"Carlos Mendoza Test","email":"carlos@test-panaderia.com","phone":"+17135551234","company":"Panadería Houston Test","message":"Quiero automatizar pedidos","source":"website"}')
test_result $([ "$R" = "200" ] && echo 0 || echo 1) "T1.1 Lead válido completo (HTTP $R)"
sleep 3

# T1.2: Invalid lead - insufficient data (name too short, no contact)
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-lead-capture" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"name":"X","email":"","phone":"","source":"website"}')
test_result $([ "$R" = "200" ] || [ "$R" = "400" ] && echo 0 || echo 1) "T1.2 Lead datos insuficientes - descarte (HTTP $R)"
sleep 2

# T1.3: Duplicate lead (same email as T1.1)
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-lead-capture" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"name":"Carlos Mendoza Test","email":"carlos@test-panaderia.com","phone":"+17135551234","company":"Panadería Houston Test","message":"Segundo contacto de prueba","source":"website"}')
test_result $([ "$R" = "200" ] && echo 0 || echo 1) "T1.3 Lead duplicado - update (HTTP $R)"
sleep 2

# T1.4: No auth token (should reject)
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-lead-capture" \
  -H "Content-Type: application/json" \
  -d '{"name":"Hacker","email":"h@evil.com","source":"website"}')
test_result $([ "$R" = "401" ] || [ "$R" = "403" ] && echo 0 || echo 1) "T1.4 Sin token - reject (HTTP $R)"
sleep 2

# T1.5: Referral lead
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-lead-capture" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"name":"María López Test","email":"maria@test-restaurante.com","phone":"+12815559876","company":"Restaurante Latino Test","message":"Carlos me recomendó","source":"referral","referred_by":"Carlos Mendoza"}')
test_result $([ "$R" = "200" ] && echo 0 || echo 1) "T1.5 Lead referido (HTTP $R)"
sleep 3

# ─── WF-03: PROPOSAL DRAFTING ───
echo ""
echo "▶ WF-03: Proposal Drafting"

R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-generate-proposal" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"lead_id":"TEST-MANUAL","discovery_notes":"15 pedidos diarios por WhatsApp","pain_points":"Pérdida de pedidos, errores manuales","processes_to_automate":"Recepción y tracking de pedidos","current_systems":"WhatsApp personal","estimated_complexity":"starter","timeline_preference":"2 semanas","budget_discussed":"No discutido"}')
test_result $([ "$R" = "200" ] && echo 0 || echo 1) "T3.1 Generar propuesta starter (HTTP $R)"
sleep 3

# ─── WF-04: CLIENT ONBOARDING ───
echo ""
echo "▶ WF-04: Client Onboarding"

R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-client-onboarding" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"lead_id":"TEST-MANUAL","contract_date":"2026-04-04","tier":"starter","setup_amount":1000,"retainer_amount":300,"scope_summary":"Automatización de recepción de pedidos vía WhatsApp","access_requirements":["WhatsApp Business API"],"kick_off_date":"2026-04-07"}')
test_result $([ "$R" = "200" ] && echo 0 || echo 1) "T4.1 Client onboarding starter (HTTP $R)"
sleep 3

# ─── WF-05: PROJECT TRACKER ───
echo ""
echo "▶ WF-05: Project Tracker"

R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-project-update" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"project_id":"TEST-MANUAL","new_phase":"design","notes":"Moving to design phase"}')
test_result $([ "$R" = "200" ] && echo 0 || echo 1) "T5.1 Phase update con gate (HTTP $R)"
sleep 2

R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-project-update" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"project_id":"TEST-MANUAL","new_phase":"build","notes":"Moving to build phase"}')
test_result $([ "$R" = "200" ] && echo 0 || echo 1) "T5.2 Phase update sin gate (HTTP $R)"
sleep 2

# ─── WF-06: QA/GO-LIVE ───
echo ""
echo "▶ WF-06: QA/Go-Live Gate"

# T6.1: QA passes all checks
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-qa-golive" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"project_id":"TEST-QA-PASS","qa_results":{"test_cases_total":10,"test_cases_passed":10,"test_cases_failed":0,"edge_cases_tested":5,"rollback_tested":true,"staging_url":"http://staging.test","notes":"All tests passing"}}')
test_result $([ "$R" = "200" ] && echo 0 || echo 1) "T6.1 QA aprobado - all checks pass (HTTP $R)"
sleep 2

# T6.2: QA fails (low pass rate, no rollback)
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/katia-qa-golive" \
  -H "Content-Type: application/json" \
  -H "x-katia-token: $TOKEN" \
  -d '{"project_id":"TEST-QA-FAIL","qa_results":{"test_cases_total":10,"test_cases_passed":8,"test_cases_failed":2,"edge_cases_tested":1,"rollback_tested":false,"staging_url":"http://staging.test","notes":"2 failures, rollback not tested"}}')
test_result $([ "$R" = "200" ] && echo 0 || echo 1) "T6.2 QA rechazado - blockers detected (HTTP $R)"

# ─── SUMMARY ───
echo ""
echo "═══════════════════════════════════════"
echo "RESULTS: $PASS/$TOTAL passed, $FAIL failed"
echo "═══════════════════════════════════════"

if [ "$FAIL" -eq 0 ]; then
  echo "🎉 ALL TESTS PASSED — Ready for Gate A"
else
  echo "⚠️ FAILURES DETECTED — Review before proceeding"
fi

exit $FAIL
