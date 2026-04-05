#!/usr/bin/env python3
"""
KATIA.AI — Google Sheets Setup Script
Creates KATIA_CRM and KATIA_DELIVERY spreadsheets with correct headers.

Prerequisites:
  pip install google-auth google-auth-oauthlib google-api-python-client

Usage:
  python3 create_katia_sheets.py --credentials /path/to/credentials.json
"""

import argparse
import json
import os
import sys

KATIA_CRM_CONFIG = {
    "title": "KATIA_CRM",
    "sheets": {
        "Leads": [
            "lead_id", "name", "email", "phone", "company", "message",
            "source", "referred_by", "status", "score", "next_action",
            "owner", "created_at", "updated_at", "next_touch_date",
            "classification", "reasoning", "suggested_approach"
        ],
        "Activities": [
            "activity_id", "lead_id", "type", "source", "details",
            "timestamp", "workflow"
        ],
        "Discarded_Leads": [
            "lead_id", "name", "email", "phone", "source", "reason",
            "timestamp"
        ]
    }
}

KATIA_DELIVERY_CONFIG = {
    "title": "KATIA_DELIVERY",
    "sheets": {
        "Clients": [
            "client_id", "name", "company", "email", "phone",
            "contract_date", "tier", "setup_amount", "retainer_amount",
            "status", "onboarding_checklist", "notes", "created_at"
        ],
        "Projects": [
            "project_id", "client_id", "name", "description", "status",
            "phase", "start_date", "target_date", "actual_date",
            "risk_level", "design_pack_url", "qa_checklist", "owner", "notes"
        ],
        "Project_Activities": [
            "activity_id", "project_id", "type", "details", "timestamp",
            "workflow"
        ]
    }
}


def create_spreadsheet(service, config):
    body = {
        "properties": {"title": config["title"]},
        "sheets": [
            {
                "properties": {"title": sheet_name},
                "data": [{
                    "startRow": 0,
                    "startColumn": 0,
                    "rowData": [{
                        "values": [
                            {"userEnteredValue": {"stringValue": h}}
                            for h in headers
                        ]
                    }]
                }]
            }
            for sheet_name, headers in config["sheets"].items()
        ]
    }
    result = service.spreadsheets().create(body=body).execute()
    spreadsheet_id = result["spreadsheetId"]
    print(f"Created '{config['title']}' -> ID: {spreadsheet_id}")
    for sheet_name in config["sheets"]:
        print(f"  Sheet: {sheet_name} ({len(config['sheets'][sheet_name])} columns)")
    return spreadsheet_id


def main():
    parser = argparse.ArgumentParser(description="Create KATIA.AI Google Sheets")
    parser.add_argument("--credentials", required=True, help="Path to OAuth2 credentials JSON")
    parser.add_argument("--token", default="token.json", help="Path to save/load auth token")
    args = parser.parse_args()

    try:
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        from google.auth.transport.requests import Request
        from googleapiclient.discovery import build
    except ImportError:
        print("ERROR: Missing dependencies. Run:")
        print("  pip install google-auth google-auth-oauthlib google-api-python-client")
        sys.exit(1)

    SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
    creds = None

    if os.path.exists(args.token):
        creds = Credentials.from_authorized_user_file(args.token, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(args.credentials, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(args.token, "w") as f:
            f.write(creds.to_json())

    service = build("sheets", "v4", credentials=creds)

    print("=" * 50)
    print("KATIA.AI — Creating Google Sheets")
    print("=" * 50)

    crm_id = create_spreadsheet(service, KATIA_CRM_CONFIG)
    delivery_id = create_spreadsheet(service, KATIA_DELIVERY_CONFIG)

    print()
    print("=" * 50)
    print("DONE! Save these IDs:")
    print(f"  KATIA_CRM_SPREADSHEET_ID={crm_id}")
    print(f"  KATIA_DELIVERY_SPREADSHEET_ID={delivery_id}")
    print("=" * 50)

    env_snippet = f"""
# Add to ~/.n8n/.env or your environment:
KATIA_CRM_SPREADSHEET_ID={crm_id}
KATIA_DELIVERY_SPREADSHEET_ID={delivery_id}
"""
    print(env_snippet)


if __name__ == "__main__":
    main()
