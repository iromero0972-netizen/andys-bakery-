# BUILD SPEC: WF-01 — Lead Capture & Normalize

## KAT-COM-LeadCapture-v1

---

## Metadata

| Campo | Valor |
|-------|-------|
| Código | WF-01 |
| Nombre N8N | KAT-COM-LeadCapture-v1 |
| Gerencia | Comercial |
| Riesgo | R3 |
| Dependencias | Ninguna (primer workflow) |
| Google Sheet | KATIA_CRM |

## Propósito

Capturar leads de todos los canales (webhook, email), normalizar datos, validar, de-duplicar, registrar en CRM, y notificar al CEO via Telegram.

---

## Pre-requisitos

1. Google Sheet "KATIA_CRM" creado con 3 hojas (ver estructura abajo)
2. Credenciales Google Sheets OAuth2 configuradas en N8N
3. Credenciales Gmail OAuth2 configuradas en N8N
4. Telegram Bot Token configurado en N8N
5. Variable de entorno `KATIA_WEBHOOK_TOKEN` definida
6. Variable de entorno `TELEGRAM_CEO_CHAT_ID` definida

---

## Google Sheet: KATIA_CRM

### Hoja "Leads"

| Columna | Tipo | Descripción |
|---------|------|-------------|
| lead_id | String | KAT-L-{timestamp} |
| name | String | Nombre del contacto |
| email | String | Email normalizado (lowercase, trimmed) |
| phone | String | Teléfono (solo dígitos y +) |
| company | String | Empresa (default: "Sin empresa") |
| message | String | Mensaje truncado a 1000 chars |
| source | String | Canal de origen (website, email, referral, etc.) |
| referred_by | String | Nombre del referidor |
| status | String | new, scored, nurturing, contacted, converted, disqualified |
| score | Number | 0-100 (asignado por WF-02) |
| next_action | String | qualify, contact_24h, follow_up_day_N, none |
| owner | String | Responsable (default: ignacio) |
| created_at | ISO Date | Fecha de creación |
| updated_at | ISO Date | Última actualización |

### Hoja "Activities"

| Columna | Tipo | Descripción |
|---------|------|-------------|
| activity_id | String | ACT-{timestamp} |
| lead_id | String | Referencia al lead |
| type | String | lead_captured, email_sent, etc. |
| source | String | Canal de origen |
| details | String | Descripción de la actividad |
| timestamp | ISO Date | Fecha/hora |
| workflow | String | Nombre del workflow |

### Hoja "Discarded_Leads"

| Columna | Tipo | Descripción |
|---------|------|-------------|
| lead_id | String | KAT-L-{timestamp} |
| name | String | Nombre recibido |
| email | String | Email recibido |
| phone | String | Teléfono recibido |
| source | String | Canal de origen |
| reason | String | datos_insuficientes |
| timestamp | ISO Date | Fecha/hora del descarte |

---

## Flujo de Nodos (Diagrama)

```
[Lead Inbound (Webhook)] ──┐
                            ├──→ [Normalizer] → [Datos Válidos?]
[Email Inbound (Gmail)]  ──┘        │                │
                                    │           ┌────┴────┐
                                    │         TRUE      FALSE
                                    │           │         │
                                    │    [Dedup Check]  [Log Descarte]
                                    │           │         │
                                    │    [¿Duplicado?] [Response Error]
                                    │      │        │
                                    │    TRUE     FALSE
                                    │      │        │
                                    │  [Update]  [Crear Nuevo]
                                    │      │        │
                                    │      └───┬────┘
                                    │          │
                                    │   [Notificar CEO]
                                    │          │
                                    │   [Activity Log]
                                    │          │
                                    │    [Response 200]
                                    │
                              [Error Handler] → [Error Telegram]
                              (connected to Dedup, Update, Create, Telegram)
```

---

## Especificación Detallada de Nodos

### Nodo 1: Webhook — "Lead Inbound"

```
Tipo: Webhook
HTTP Method: POST
Path: katia-lead-capture
Authentication: Header Auth
  Header Name: x-katia-token
  Header Value: ={{$env.KATIA_WEBHOOK_TOKEN}}
Response Mode: Using 'Respond to Webhook' Node
```

**Input Body esperado:**
```json
{
  "name": "string (requerido)",
  "email": "string (requerido si no hay phone)",
  "phone": "string (requerido si no hay email)",
  "company": "string (opcional)",
  "message": "string (opcional)",
  "source": "string (opcional, default: website)",
  "referred_by": "string (opcional)"
}
```

### Nodo 2: Gmail Trigger — "Email Inbound"

```
Tipo: Gmail Trigger
Poll Times: Every 5 Minutes
Labels: INBOX
Action: Mark As Read
Simple Output: false
```

### Nodo 3: Set — "Normalizer"

Normaliza datos de cualquier fuente (webhook o email) a un formato común.

| Campo | Expresión |
|-------|-----------|
| lead_id | `{{"KAT-L-" + Date.now()}}` |
| name | `{{($json.name \|\| $json.from?.split('<')[0]?.trim() \|\| "").trim()}}` |
| email | `{{($json.email \|\| $json.from?.match(/<(.+?)>/)?.[1] \|\| "").toLowerCase().trim()}}` |
| phone | `{{($json.phone \|\| "").replace(/[^0-9+]/g, "")}}` |
| company | `{{($json.company \|\| "Sin empresa").trim()}}` |
| message | `{{($json.message \|\| $json.subject \|\| "").substring(0, 1000)}}` |
| source | `{{($json.source \|\| "email").toLowerCase()}}` |
| referred_by | `{{$json.referred_by \|\| ""}}` |
| status | `"new"` |
| score | `0` |
| next_action | `"qualify"` |
| owner | `"ignacio"` |
| created_at | `{{new Date().toISOString()}}` |
| updated_at | `{{new Date().toISOString()}}` |

### Nodo 4: IF — "Datos Válidos?"

**Condiciones (AND):**
- `name` is not empty
- `name.length` >= 2
- OR: `email` is not empty OR `phone` is not empty

**True →** Nodo 5 (Dedup Check)
**False →** Nodo 4B (Log Descarte)

### Nodo 4B: Google Sheets — "Log Descarte"

Append to KATIA_CRM → Discarded_Leads with reason="datos_insuficientes"

### Nodo 5: Google Sheets — "Dedup Check"

Read from KATIA_CRM → Leads, filter by email = current lead email

### Nodo 6: IF — "¿Duplicado?"

Result array length > 0 → True (duplicate exists)

**True →** Nodo 6B (Update)
**False →** Nodo 7 (Create)

### Nodo 6B: Google Sheets — "Update Lead Existente"

Update existing lead: append new message with " | " separator, update source and updated_at. Match by email column.

### Nodo 7: Google Sheets — "Crear Lead Nuevo"

Append all normalized fields to KATIA_CRM → Leads

### Nodo 8: Telegram — "Notificar CEO"

```
🎯 *NUEVO LEAD KATIA.AI*
━━━━━━━━━━━━━━━━━━━
*Nombre:* {{$json.name}}
*Empresa:* {{$json.company}}
*Email:* {{$json.email}}
*Tel:* {{$json.phone}}
*Fuente:* {{$json.source}}
━━━━━━━━━━━━━━━━━━━
*Mensaje:* {{$json.message}}
━━━━━━━━━━━━━━━━━━━
✅ Registrado en CRM
⏭️ Next: Calificar (WF-02)
```

### Nodo 9: Google Sheets — "Activity Log"

Append to KATIA_CRM → Activities: type=lead_captured, workflow=KAT-COM-LeadCapture-v1

### Nodo 10: Respond to Webhook — "Response"

```json
{
  "success": true,
  "lead_id": "{{$json.lead_id}}",
  "message": "Lead registrado"
}
```

### Error Handler

Connected to nodes 5 (Dedup), 6B (Update), 7 (Create), 8 (Telegram).

**Set node:** Captures node_name, error_message, timestamp
**Telegram node:**
```
⚠️ *ERROR WF-01*
Nodo: {{$json.node_name}}
Error: {{$json.error_message}}
```

---

## Pre-Mortem: Modos de Fallo

| Fallo | Probabilidad | Impacto | Mitigación |
|-------|-------------|---------|------------|
| Google Sheets API rate limit | Media | Alto | Retry con exponential backoff en N8N |
| Email parsing falla (formato inesperado) | Media | Bajo | Normalizer maneja campos nulos con fallbacks |
| Webhook sin autenticación | Baja | Alto | Header auth obligatorio, rechaza sin token |
| Lead duplicado no detectado (email diferente) | Media | Medio | Dedup por email; futuro: agregar dedup por phone |
| Telegram bot no responde | Baja | Bajo | Error handler notifica, lead se registra igual |
| Datos PII expuestos en logs | Baja | Alto | N8N logs no incluyen body completo por default |

---

## Test Cases

### T1.1: Lead válido completo
```bash
curl -X POST http://localhost:5678/webhook/katia-lead-capture \
  -H "Content-Type: application/json" \
  -H "x-katia-token: TEST_TOKEN" \
  -d '{"name":"Carlos Mendoza","email":"carlos@panaderiahouston.com","phone":"+17135551234","company":"Panadería Houston","message":"Quiero automatizar pedidos","source":"website"}'
```
**Esperado:** HTTP 200, lead creado en Sheets, Telegram notificado, Activity logged

### T1.2: Lead sin datos suficientes
```bash
curl -X POST http://localhost:5678/webhook/katia-lead-capture \
  -H "Content-Type: application/json" \
  -H "x-katia-token: TEST_TOKEN" \
  -d '{"name":"X","email":"","phone":"","source":"website"}'
```
**Esperado:** HTTP 200/400, registrado en Discarded_Leads con reason=datos_insuficientes

### T1.3: Lead duplicado
Enviar T1.1 dos veces.
**Esperado:** Segundo envío actualiza el lead existente (message con " | "), no crea nuevo

### T1.4: Sin token de autenticación
```bash
curl -X POST http://localhost:5678/webhook/katia-lead-capture \
  -H "Content-Type: application/json" \
  -d '{"name":"Hacker","email":"h@evil.com","source":"website"}'
```
**Esperado:** HTTP 401 o 403

### T1.5: Lead por referido
```bash
curl -X POST http://localhost:5678/webhook/katia-lead-capture \
  -H "Content-Type: application/json" \
  -H "x-katia-token: TEST_TOKEN" \
  -d '{"name":"María López","email":"maria@restaurantelatino.com","phone":"+12815559876","company":"Restaurante Latino","message":"Mi amigo Carlos me recomendó","source":"referral","referred_by":"Carlos Mendoza"}'
```
**Esperado:** HTTP 200, referred_by populated, source=referral

---

## Checklist de Completación

- [ ] Workflow creado con nombre KAT-COM-LeadCapture-v1
- [ ] Todos los nodos conectados según diagrama
- [ ] Error handling conectado a nodos 5, 6B, 7, 8
- [ ] Credenciales Google Sheets configuradas
- [ ] Credenciales Gmail configuradas
- [ ] Credenciales Telegram configuradas
- [ ] Variable KATIA_WEBHOOK_TOKEN definida
- [ ] Variable TELEGRAM_CEO_CHAT_ID definida
- [ ] T1.1 ejecutado y pasado
- [ ] T1.2 ejecutado y pasado
- [ ] T1.3 ejecutado y pasado
- [ ] T1.4 ejecutado y pasado
- [ ] T1.5 ejecutado y pasado
- [ ] Workflow exportado a JSON
- [ ] Telegram notificaciones verificadas

---

*Spec preparada por Claude Opus (Automation Architect)*
*Compliance: Normas y Procedimientos KATIA.AI v1.0*
*Abril 2026*
