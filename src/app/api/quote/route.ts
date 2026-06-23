import { NextRequest, NextResponse } from "next/server";

/**
 * Quote submission API.
 *
 * Email (Resend):
 *   RESEND_API_KEY  — get free key at resend.com
 *   QUOTE_EMAIL_TO  — override destination (default: guelph@mtprint.com)
 *   QUOTE_EMAIL_FROM — override sender (default: quotes@mtprint.com)
 *
 * Airtable (optional):
 *   AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME=Leads
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

async function sendEmail(payload: QuotePayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.QUOTE_EMAIL_TO ?? "guelph@mtprint.com";
  const from = process.env.QUOTE_EMAIL_FROM ?? "quotes@mtprint.com";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <div style="border-top:4px solid #00AEEF;padding-top:16px;margin-bottom:24px">
        <h2 style="margin:0;font-size:22px;font-weight:900;color:#0A0A0A">New Quote Request</h2>
        <p style="margin:4px 0 0;color:#6b7280;font-size:13px">M&T Printing Group — Vehicle Wraps</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px">Name</td><td style="padding:8px 0;font-weight:600;color:#0A0A0A">${payload.name}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Company</td><td style="padding:8px 0;font-weight:600;color:#0A0A0A">${payload.company || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${payload.email}" style="color:#00AEEF">${payload.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0"><a href="tel:${payload.phone}" style="color:#00AEEF">${payload.phone}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Vehicle</td><td style="padding:8px 0;font-weight:600;color:#0A0A0A">${payload.vehicleType || "—"}</td></tr>
        ${payload.packageType ? `<tr><td style="padding:8px 0;color:#6b7280">Package</td><td style="padding:8px 0;font-weight:600;color:#0A0A0A">${payload.packageType}</td></tr>` : ""}
        ${payload.estimatedTotal ? `<tr><td style="padding:8px 0;color:#6b7280">Est. Total</td><td style="padding:8px 0;font-weight:900;color:#0A0A0A;font-size:18px">$${Number(payload.estimatedTotal).toLocaleString()}</td></tr>` : ""}
      </table>
      ${payload.notes ? `<div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px"><p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Notes</p><p style="margin:0;color:#374151;font-size:14px">${payload.notes}</p></div>` : ""}
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af">
        Submitted ${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })} EST
      </div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `New Quote Request — ${payload.name}${payload.company ? ` (${payload.company})` : ""}`,
      html,
      reply_to: payload.email,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[Resend] Failed to send email:", body);
  }
}

async function postToAirtable(payload: QuotePayload): Promise<void> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME ?? "Leads";
  if (!apiKey || !baseId) return;

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
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    }
  );
  if (!res.ok) console.error("[Airtable] Failed:", await res.text());
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
        packageType: formData.get("packageType") ? String(formData.get("packageType")) : undefined,
        estimatedTotal: formData.get("estimatedTotal") ? String(formData.get("estimatedTotal")) : undefined,
        notes: formData.get("notes") ? String(formData.get("notes")) : undefined,
      };
    } else {
      payload = await request.json();
    }

    if (!payload.name || !payload.email || !payload.phone) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, phone" },
        { status: 400 }
      );
    }

    await Promise.all([
      sendEmail(payload),
      postToAirtable(payload),
    ]);

    return NextResponse.json({ success: true, message: "Quote request received" }, { status: 200 });
  } catch (err) {
    console.error("[Quote API]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
