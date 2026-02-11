import { getUserFromToken } from "@/app/libs/auth";
import Notes from "@/app/models/Notes";
import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { title, content } = await req.json();
    await connectDB();
    const newNote = await Notes.create({
      title,
      content,
      user: (user as any).id,
    });
    return NextResponse.json(
      { message: "Note created successfully", note: newNote },
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

export const GET = async () => {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const notes = await Notes.find({ user: (user as any).id }).sort({
      createdAt: -1,
    });
    return NextResponse.json(notes);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
