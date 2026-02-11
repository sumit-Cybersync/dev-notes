import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export const POST = async (req: NextResponse) => {
  try {
    const { name, email, password } = await req.json();
    await connectDB();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
