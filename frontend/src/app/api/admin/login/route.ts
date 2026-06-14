import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Admin } from "@/models/Admin";
import { comparePassword, generateToken } from "@/utils/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const admin = await Admin.findOne({ email }).exec();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await comparePassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken({ id: admin._id, role: admin.role });

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400 // 1 day
    });

    return response;

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Validation error", errors: (error as any).errors }, { status: 400 });
    }
    console.error("POST /api/admin/login error:", error);
    return NextResponse.json({ success: false, message: "Server error during login" }, { status: 500 });
  }
}
