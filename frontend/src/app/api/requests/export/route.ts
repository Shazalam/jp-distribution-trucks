import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Lead } from "@/models/Lead";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { stringify } from "csv-stringify/sync";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const authHeader = req.headers.get("Authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    const finalToken = token || bearerToken;
    if (!finalToken) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(finalToken);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    // Fetch leads
    const leads = await Lead.find().sort({ createdAt: -1 }).lean().exec();

    // Map to CSV format
    const data = leads.map((lead: any) => ({
      RequestID: lead.requestId,
      CustomerName: lead.customerName,
      Email: lead.email,
      Phone: lead.phone,
      Country: lead.country || "",
      FormType: lead.formType,
      SourcePage: lead.sourcePage || "",
      SelectedProduct: lead.selectedVehicle || lead.selectedBuild || lead.selectedPart || "",
      Status: lead.status,
      Priority: lead.priority,
      CreatedDate: new Date(lead.createdAt).toISOString()
    }));

    // Generate CSV
    const csvContent = stringify(data, { header: true });

    // Return as downloadable file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=jp-distribution-leads.csv",
      },
    });

  } catch (error) {
    console.error("GET /api/requests/export error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
