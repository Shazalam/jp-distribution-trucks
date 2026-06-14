import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/models/Admin";
import { hashPassword } from "@/utils/auth";

export async function GET(req: Request) {
  try {
    // SECURITY: This route should ideally be disabled in production or secured.
    // For this demonstration, we allow it to create the initial admin if none exists.
    
    await connectToDatabase();
    
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json({ success: false, message: "Admin account already exists." }, { status: 400 });
    }

    const defaultEmail = "admin@jp-distribution.com";
    const defaultPassword = "password123";

    const hashedPassword = await hashPassword(defaultPassword);

    const newAdmin = new Admin({
      name: "Super Admin",
      email: defaultEmail,
      passwordHash: hashedPassword,
      role: "Super Admin"
    });

    await newAdmin.save();

    return NextResponse.json({ 
      success: true, 
      message: "Admin account created successfully. Please delete this route in production.",
      credentials: {
        email: defaultEmail,
        password: defaultPassword
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
