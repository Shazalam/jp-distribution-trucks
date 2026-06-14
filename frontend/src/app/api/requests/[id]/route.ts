import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Lead } from "@/models/Lead";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

async function checkAuth(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const authHeader = req.headers.get("Authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  const finalToken = token || bearerToken;
  if (!finalToken) return null;

  return verifyToken(finalToken);
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    await connectToDatabase();
    
    const user = await checkAuth(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await context.params;
    const leadId = resolvedParams.id;
    const lead = await Lead.findById(leadId).exec();
    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: lead }, { status: 200 });

  } catch (error) {
    console.error("GET /api/requests/[id] error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    await connectToDatabase();
    
    const user = await checkAuth(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "Super Admin") {
      return NextResponse.json({ success: false, message: "Forbidden: Super Admin only" }, { status: 403 });
    }

    const resolvedParams = await context.params;
    const leadId = resolvedParams.id;
    const lead = await Lead.findByIdAndDelete(leadId).exec();
    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("DELETE /api/requests/[id] error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
