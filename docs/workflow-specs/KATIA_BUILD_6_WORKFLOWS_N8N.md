# KATIA.AI — 6 Workflows Críticos en N8N

## Instrucciones de Build para Claude Code — Abril 2026

---

## INSTRUCCIONES GENERALES

Estos son los 6 workflows críticos de KATIA.AI. Construir en orden (WF-01 primero, WF-06 último). Cada workflow debe:

1. Seguir la especificación EXACTA de nodos descrita aquí
2. Usar naming convention: `KAT-COM-NombreWorkflow-v1` (Comercial) o `KAT-DEL-NombreWorkflow-v1` (Delivery)
3. Incluir error handling en TODOS los nodos críticos
4. Exportar cada workflow a JSON después de construirlo
5. NO improvisar nodos que no estén en la spec (RO-01: Cero Improvisación)

### Infraestructura compartida:

- **Google Sheet:** "KATIA_CRM" — se comparte entre WF-01 a WF-03
- **Google Sheet:** "KATIA_DELIVERY" — se comparte entre WF-04 a WF-06
- **Telegram Bot:** Un solo bot para todas las notificaciones al CEO
- **Webhook Auth:** Header `x-katia-token` con valor de env `KATIA_WEBHOOK_TOKEN`

### Credenciales necesarias (configurar primero en N8N):

1. Google Sheets OAuth2 (acceso a KATIA_CRM y KATIA_DELIVERY)
2. Gmail OAuth2 (envío de emails)
3. Telegram Bot Token (notificaciones)
4. Anthropic API Key (Claude API para IA)

---

## WF-01: LEAD CAPTURE & NORMALIZE

- **Código:** WF-01
- **Nombre N8N:** KAT-COM-LeadCapture-v1
- **Gerencia:** Comercial
- **Riesgo:** R3
- **Propósito:** Capturar leads de todos los canales, normalizar datos, registrar en CRM, notificar CEO

### Google Sheet: "KATIA_CRM"

Crear este spreadsheet con 3 hojas ANTES de construir los workflows:

**Hoja "Leads":** lead_id | name | email | phone | company | message | source | referred_by | status | score | next_action | owner | created_at | updated_at

**Hoja "Activities":** activity_id | lead_id | type | source | details | timestamp | workflow

**Hoja "Discarded_Leads":** lead_id | name | email | phone | source | reason | timestamp

### Nodos:

1. **Webhook — "Lead Inbound":** POST /katia-lead-capture, Header Auth (x-katia-token), Response Mode: Respond to Webhook Node
2. **Gmail Trigger — "Email Inbound":** Poll Every 5 Min, INBOX, Mark As Read
3. **Set — "Normalizer":** Normalize all fields (lead_id, name, email, phone, company, message, source, referred_by, status=new, score=0, next_action=qualify, owner=ignacio, timestamps)
4. **IF — "Datos Válidos?":** name not empty AND length >= 2 AND (email or phone not empty). True → Dedup. False → Log Descarte
4B. **Google Sheets — "Log Descarte":** Append to Discarded_Leads, reason=datos_insuficientes. Then → Response Error
5. **Google Sheets — "Dedup Check":** Read Leads filtered by email
6. **IF — "¿Duplicado?":** Array length > 0. True → Update existing. False → Create new
6B. **Google Sheets — "Update Lead Existente":** Update message (append), updated_at, source
7. **Google Sheets — "Crear Lead Nuevo":** Append all Normalizer fields
8. **Telegram — "Notificar CEO":** Markdown notification with lead details
9. **Google Sheets — "Activity Log":** Append to Activities sheet
10. **Respond to Webhook — "Response":** 200, {success, lead_id, message}

**Error Handler:** Set (node_name, error_message, timestamp) → Telegram alert. Connected to nodes 5, 6B, 7, 8.

---

## WF-02: LEAD SCORE + FOLLOW-UP ENGINE

- **Código:** WF-02
- **Nombre N8N:** KAT-COM-LeadScoreFollowup-v1
- **Gerencia:** Comercial
- **Riesgo:** R3
- **Propósito:** Evaluar leads con scoring IA, clasificar SQL/MQL/Discard, ejecutar secuencia de follow-up de 7 toques en 14 días

### Nodos:

1. **Schedule Trigger:** Every 6 hours (0 */6 * * *)
2. **Google Sheets — Read:** Leads where score=0 AND status=new
3. **IF — "¿Hay leads?":** Array has items
4. **HTTP Request — Claude API:** Lead Scoring with ICP criteria (PYME latina Texas, 5-50 empleados). Returns score 0-100, classification SQL/MQL/DISCARD
5. **Set — "Parsear Score":** Extract score, classification, reasoning, suggested_approach from Claude response
6. **Google Sheets — Update:** Lead with score, status=scored, next_action
7. **Switch — "Clasificar":** SQL (>80) → Hot Lead Alert. MQL (60-80) → Nurturing. DISCARD (<60) → Archive
8A. **Telegram — Hot Lead Alert**
8B. **Set — Iniciar Nurturing:** status=nurturing, next_touch_date=tomorrow
8C. **Google Sheets — Archive:** status=disqualified
9. **Schedule Trigger — Follow-up Diario:** 10am CST Mon-Fri
10. **Google Sheets — Read:** Leads with next_touch_date=today
11. **Switch — Día de Secuencia:** 7 touches over 14 days (day 1,3,5,7,10,12,14). Day 12 = LinkedIn (manual, notify CEO)
12. **HTTP Request — Claude API:** Generate personalized email
13. **Gmail — Send Email**
14. **Google Sheets — Log + Update:** Activity log, advance to next touch
15. **Telegram — Daily Summary**

---

## WF-03: PROPOSAL DRAFTING + APPROVAL

- **Código:** WF-03
- **Nombre N8N:** KAT-COM-ProposalDrafting-v1
- **Gerencia:** Comercial + CEO
- **Riesgo:** R1 (requiere aprobación CEO)
- **Propósito:** Generar borrador de propuesta comercial con IA, CEO revisa y aprueba, envío al prospecto

### Pricing Tiers:

| Tier | Setup | Retainer | Workflows | Support | SLA |
|------|-------|----------|-----------|---------|-----|
| Starter | $500-$1,500 | $200-$500/mes | 1-2 | Email | 48hrs |
| Growth | $1,500-$3,000 | $500-$1,000/mes | 3-5 | Prioritario | 24hrs |
| Enterprise | $3,000-$10,000 | $1,000-$2,500/mes | Custom | Dedicado | 4hrs |

### Nodos:

1. **Webhook:** POST /katia-generate-proposal (lead_id, discovery_notes, pain_points, processes, complexity, timeline, budget)
2. **Google Sheets — Read Lead**
3. **Set — Pricing Table:** Lookup by estimated_complexity
4. **HTTP Request — Claude API:** Generate proposal (diagnosis, solution, benefits, timeline, pricing, terms 50/50 Net 10)
5. **Telegram — CEO Review:** REQUIERE APROBACIÓN (R1)
6. **Wait — Webhook Resume:** katia-proposal-approval, 48h timeout
7. **IF — ¿Aprobado?:** approved → Send. rejected → Log
8. **Gmail — Send Proposal**
9. **Google Sheets — Update Lead + Log Activity**
10. **Telegram — Confirmation**

---

## WF-04: CLIENT ONBOARDING PACK

- **Código:** WF-04
- **Nombre N8N:** KAT-DEL-ClientOnboarding-v1
- **Gerencia:** Delivery
- **Riesgo:** R2
- **Propósito:** Crear expediente del cliente, checklist de accesos, kick-off agenda, notificar Delivery

### Google Sheet: "KATIA_DELIVERY"

**Hoja "Clients":** client_id | name | company | email | phone | contract_date | tier | setup_amount | retainer_amount | status | onboarding_checklist | notes | created_at

**Hoja "Projects":** project_id | client_id | name | description | status | phase | start_date | target_date | actual_date | risk_level | design_pack_url | qa_checklist | owner | notes

**Hoja "Project_Activities":** activity_id | project_id | type | details | timestamp | workflow

### Nodos:

1. **Webhook:** POST /katia-client-onboarding (lead_id, contract_date, tier, amounts, scope, accesses, kick_off_date)
2. **Google Sheets — Read Lead from CRM**
3. **Set — Create Client Record:** client_id=KAT-C-timestamp, merge data, checklist (6 items)
4. **Google Sheets — Create Client** in KATIA_DELIVERY
5. **Google Sheets — Create Project:** project_id=KAT-P-timestamp, status=intake, phase=onboarding, risk by tier
6. **Google Sheets — Update Lead in CRM:** status=converted
7. **Gmail — Welcome Email:** Scope summary, access checklist, kick-off date
8. **Telegram — Notify CEO + Delivery**
9. **Google Sheets — Log Activity**

---

## WF-05: PROJECT TRACKER + STATUS ENGINE

- **Código:** WF-05
- **Nombre N8N:** KAT-DEL-ProjectTracker-v1
- **Gerencia:** Delivery
- **Riesgo:** R1
- **Propósito:** Rastrear status de proyectos por fase, alertar SLA vencidos, dashboard CEO

### Nodos:

1. **Schedule Trigger:** 8am CST Mon-Fri
2. **Google Sheets — Read Active Projects:** status NOT IN (closed, cancelled)
3. **Code — SLA Calculator:** days_remaining, is_overdue, is_at_risk, sla_status
4. **Switch:** OVERDUE → Urgent Alert. AT_RISK → Warning. ON_TRACK → Dashboard
5A. **Telegram — OVERDUE Alert**
5B. **Telegram — AT_RISK Warning**
6. **Telegram — Daily Dashboard:** Active, on track, at risk, overdue counts
7. **Webhook — Phase Update:** POST /katia-project-update (project_id, new_phase, notes)
8. **IF — Gate Required?:** design, qa, ready_go_live require Gate approval
9. **Telegram — Request Gate Approval**
10. **Google Sheets — Update Project + Log**

### Valid Phases:
intake → design → build → qa → uat → ready_go_live → prod → hypercare → closed

---

## WF-06: QA/UAT + GO-LIVE GATE

- **Código:** WF-06
- **Nombre N8N:** KAT-DEL-QAGoLive-v1
- **Gerencia:** Delivery + Lab
- **Riesgo:** R1
- **Propósito:** QA checklist, verify rollback, obtain approvals, execute deploy

### QA Readiness Criteria:
- Pass rate >= 95%
- 0 failed tests
- Rollback tested = true
- Edge cases tested >= 3

### Nodos:

1. **Webhook:** POST /katia-qa-golive (project_id, qa_results)
2. **Google Sheets — Read Project:** Verify phase = qa or uat
3. **Code — Evaluate QA:** Calculate pass_rate, blockers list
4. **IF — QA Approved?:** is_ready=true → Go-Live. false → Reject with blockers
4B. **Telegram — QA Rejected:** Blockers list
5. **Telegram — Triple Sign-off Request:** Technical Owner + Business Owner + CEO (RO-09)
6. **Wait — Webhook Resume:** katia-golive-approval, 72h timeout
7. **IF — Go-Live Approved?**
8. **Set — Deploy to Prod:** Update project phase=prod
9. **Telegram — Go-Live Confirmed:** Hypercare active 7 days
10. **Set — Start Hypercare:** phase=hypercare, end_date=today+7

---

## RESUMEN: ORDEN DE CONSTRUCCIÓN

| Orden | Workflow | Dependencia |
|-------|----------|-------------|
| 1 | WF-01 Lead Capture | Ninguna. Crear KATIA_CRM primero |
| 2 | WF-02 Lead Score + Follow-up | WF-01 (usa KATIA_CRM) |
| 3 | WF-03 Proposal Drafting | WF-01 + WF-02 |
| 4 | WF-04 Client Onboarding | WF-01 a WF-03. Crear KATIA_DELIVERY |
| 5 | WF-05 Project Tracker | WF-04 (usa KATIA_DELIVERY) |
| 6 | WF-06 QA/Go-Live Gate | WF-05 (usa KATIA_DELIVERY) |

---

*Documento preparado por Claude Opus (Automation Architect)*
*Marco rector: Normas y Procedimientos KATIA.AI v1.0*
*Abril 2026*
