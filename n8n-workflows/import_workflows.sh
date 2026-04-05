#!/bin/bash
# ═══════════════════════════════════════
# KATIA.AI — Workflow Import Script
# Imports all 6 workflows into N8N via REST API
# ═══════════════════════════════════════

N8N_URL="${N8N_URL:-http://localhost:5678}"
N8N_API_KEY="${N8N_API_KEY:-}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "═══════════════════════════════════════"
echo "KATIA.AI — N8N Workflow Importer"
echo "Target: $N8N_URL"
echo "═══════════════════════════════════════"

# Pre-check
HTTP=$(curl -s -o /dev/null -w "%{http_code}" "$N8N_URL/healthz" 2>/dev/null)
if [ "$HTTP" = "000" ]; then
  echo "❌ N8N is not reachable at $N8N_URL"
  echo "Start N8N and set N8N_URL if needed."
  exit 1
fi
echo "✅ N8N is reachable"
echo ""

# Auth header
AUTH_HEADER=""
if [ -n "$N8N_API_KEY" ]; then
  AUTH_HEADER="-H \"X-N8N-API-KEY: $N8N_API_KEY\""
fi

IMPORTED=0
FAILED=0

for wf in \
  KAT-COM-LeadCapture-v1.json \
  KAT-COM-LeadScoreFollowup-v1.json \
  KAT-COM-ProposalDrafting-v1.json \
  KAT-DEL-ClientOnboarding-v1.json \
  KAT-DEL-ProjectTracker-v1.json \
  KAT-DEL-QAGoLive-v1.json; do

  FILE="$SCRIPT_DIR/$wf"
  if [ ! -f "$FILE" ]; then
    echo "❌ SKIP: $wf not found"
    FAILED=$((FAILED + 1))
    continue
  fi

  echo -n "Importing $wf... "
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$N8N_URL/api/v1/workflows" \
    -H "Content-Type: application/json" \
    ${N8N_API_KEY:+-H "X-N8N-API-KEY: $N8N_API_KEY"} \
    -d @"$FILE" 2>&1)

  HTTP_CODE=$(echo "$RESPONSE" | tail -1)
  BODY=$(echo "$RESPONSE" | head -n -1)

  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
    WF_ID=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id','?'))" 2>/dev/null || echo "?")
    echo "✅ OK (ID: $WF_ID)"
    IMPORTED=$((IMPORTED + 1))
  else
    echo "❌ FAILED (HTTP $HTTP_CODE)"
    echo "  Response: $(echo "$BODY" | head -c 200)"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "═══════════════════════════════════════"
echo "Imported: $IMPORTED, Failed: $FAILED"
echo "═══════════════════════════════════════"

if [ "$FAILED" -eq 0 ]; then
  echo ""
  echo "Next steps:"
  echo "  1. Open N8N UI at $N8N_URL"
  echo "  2. Configure Google Sheets credentials in each workflow"
  echo "  3. Set actual Spreadsheet IDs (replace placeholders)"
  echo "  4. Activate workflows"
  echo "  5. Run: bash test_katia_workflows.sh"
fi

exit $FAILED
