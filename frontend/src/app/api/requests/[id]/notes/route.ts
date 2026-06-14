import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Lead } from "@/models/Lead";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { z } from "zod";

async function checkAuth(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const authHeader = req.headers.get("Authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  const finalToken = token || bearerToken;
  if (!finalToken) return null;

  return verifyToken(finalToken);
}

const noteSchema = z.object({
  note: z.string().min(1, "Note cannot be empty")
});

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    await connectToDatabase();
    
    const user = await checkAuth(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    if (user.role === "Viewer") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { note } = noteSchema.parse(body);

    const resolvedParams = await context.params;
    const leadId = resolvedParams.id;
    const lead = await Lead.findById(leadId).exec();
    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    // Append to internal notes with timestamp and user name
    const timestamp = new Date().toLocaleString();
    const formattedNote = `[${timestamp}] ${user.name || "Admin"}: ${note}\n`;
    
    lead.internalNotes = (lead.internalNotes || "") + formattedNote;

    await lead.save();

    return NextResponse.json({ success: true, message: "Note added successfully", data: lead }, { status: 200 });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Validation error", errors: (error as any).errors }, { status: 400 });
    }
    console.error("PATCH /api/requests/[id]/notes error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
