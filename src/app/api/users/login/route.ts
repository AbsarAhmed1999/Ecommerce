import { connectToMongoDB } from "@/database/connection";
import { loginUserService } from "@/Service/loginUserService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const loginCredentials = await loginUserService(body);
    console.log("loginCredentials", loginCredentials);
    if (loginCredentials) {
      return NextResponse.json({ message: "SUCCESS" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "FAILED" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in API route:", error); // Log the error for debugging
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}