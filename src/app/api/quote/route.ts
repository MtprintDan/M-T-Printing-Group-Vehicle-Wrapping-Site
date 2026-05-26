import { NextRequest, NextResponse } from "next/server";

/**
 * Quote submission API route.
 *
 * Airtable integration: set these env vars to enable automatic Airtable logging:
 *   AIRTABLE_API_KEY   — your Airtable personal access token
 *   AIRTABLE_BASE_ID   — the base ID (starts with "app...")
 *   AIRTABLE_TABLE_NAME — table name, e.g. "Leads"
 *
 * Expected Airtable table fields:
 *   Name (Single line text)
 *   Company (Single line text)
 *   Email (Email)
 *   Phone (Phone number)
 *   Vehicle Type (Single line text)
 *   Package Type (Single line text)
 *   Estimated Total (Currency)
 *   Notes (Long text)
 *   Status (Single select: "New", "In Review", "Quoted", "Won", "Lost")
 *   Submitted At (Date)
 */

interface QuotePayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  vehicleType: string;
  packageType?: string;
  estimatedTotal?: string;
  notes?: string;
}

async function postToAirtable(payload: QuotePayload): Promise<void> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME ?? "Leads";

  if (!apiKey || !baseId) return; // Airtable not configured — skip silently

  const fields: Record<string, string | number> = {
    Name: payload.name,
    Company: payload.company,
    Email: payload.email,
    Phone: payload.phone,
    "Vehicle Type": payload.vehicleType,
    Status: "New",
    "Submitted At": new Date().toISOString().split("T")[0],
  };

  if (payload.packageType) fields["Package Type"] = payload.packageType;
  if (payload.estimatedTotal) fields["Estimated Total"] = Number(payload.estimatedTotal);
  if (payload.notes) fields["Notes"] = payload.notes;

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error("[Airtable] Failed to create record:", body);
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let payload: QuotePayload;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      payload = {
        name: String(formData.get("name") ?? ""),
        company: String(formData.get("company") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        vehicleType: String(formData.get("vehicleType") ?? ""),
        packageType: formData.get("packageType")
          ? String(formData.get("packageType"))
          : undefined,
        estimatedTotal: formData.get("estimatedTotal")
          ? String(formData.get("estimatedTotal"))
          : undefined,
        notes: formData.get("notes") ? String(formData.get("notes")) : undefined,
      };
    } else {
      payload = await request.json();
    }

    // Validate required fields
    if (!payload.name || !payload.email || !payload.phone) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, phone" },
        { status: 400 }
      );
    }

    // Post to Airtable (fails silently if not configured)
    await postToAirtable(payload);

    return NextResponse.json(
      { success: true, message: "Quote request received" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Quote API]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
