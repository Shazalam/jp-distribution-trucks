import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Lead } from "@/models/Lead";
import { generateRequestId, detectDuplicate, priorityResolver } from "@/utils/leadManagement";
import { sendNewLeadEmailAlert } from "@/utils/mailer";
import { z } from "zod";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

const submitSchema = z.object({
  formType: z.string().min(1, "Form type is required"),
  
  // Source Tracking
  sourcePage: z.string().optional(),
  sourceSection: z.string().optional(),
  sourceCard: z.string().optional(),
  selectedVehicle: z.string().optional(),
  selectedPart: z.string().optional(),
  selectedBuild: z.string().optional(),
  selectedProduct: z.string().optional(),
  clickedButton: z.string().optional(),
  currentUrl: z.string().optional(),
  referrerUrl: z.string().optional(),
  
  // Customer Details
  customerName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(5, "Phone is required"),
  country: z.string().optional(),
  city: z.string().optional(),
  companyName: z.string().optional(),
  customerType: z.string().optional(),

  // Request Details
  message: z.string().optional(),
  requestDetails: z.any().optional(),
  quantity: z.number().optional(),
  preferredModel: z.string().optional(),
  vehicleYear: z.string().optional(),
  partNumber: z.string().optional(),
  usageType: z.string().optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  shippingRequirement: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    
    // Validate payload
    const parsedData = submitSchema.parse(body);

    // Lead Management Logic
    const requestId = await generateRequestId();
    const priority = priorityResolver(parsedData);
    const { isDuplicate, reason } = await detectDuplicate(parsedData.email, parsedData.phone);
    
    const leadTitle = `${parsedData.formType} - ${parsedData.customerName}`;

    // Create the lead
    const newLead = new Lead({
      ...parsedData,
      requestId,
      leadTitle,
      priority,
      isDuplicate,
      duplicateReason: reason,
      status: "New",
      statusHistory: [{ status: "New", note: "Lead submitted automatically", changedBy: "System" }]
    });

    const savedLead = await newLead.save();

    // Send Admin Alert asynchronously
    sendNewLeadEmailAlert(savedLead).catch(console.error);

    return NextResponse.json({
      success: true,
      message: "Request submitted successfully",
      requestId: savedLead.requestId,
      status: savedLead.status
    }, { status: 201 });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Validation error", errors: (error as any).errors }, { status: 400 });
    }
    console.error("POST /api/requests error:", error);
    return NextResponse.json({ success: false, message: "Server error during submission" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Basic Authentication check
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

    // Build Query Filters
    const { searchParams } = new URL(req.url);
    const query: any = {};

    const status = searchParams.get("status");
    if (status) query.status = status;

    const priority = searchParams.get("priority");
    if (priority) query.priority = priority;

    const formType = searchParams.get("formType");
    if (formType) query.formType = formType;

    const country = searchParams.get("country");
    if (country) query.country = country;

    const isDuplicate = searchParams.get("duplicateOnly");
    if (isDuplicate === "true") query.isDuplicate = true;

    const searchKeyword = searchParams.get("search");
    if (searchKeyword) {
      query.$or = [
        { customerName: { $regex: searchKeyword, $options: "i" } },
        { email: { $regex: searchKeyword, $options: "i" } },
        { phone: { $regex: searchKeyword, $options: "i" } },
        { requestId: { $regex: searchKeyword, $options: "i" } },
        { companyName: { $regex: searchKeyword, $options: "i" } }
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).exec();

    return NextResponse.json({ success: true, count: leads.length, data: leads }, { status: 200 });

  } catch (error: any) {
    console.error("GET /api/requests error:", error);
    return NextResponse.json({ success: false, message: "Server error", error: error.message, stack: error.stack }, { status: 500 });
  }
}
