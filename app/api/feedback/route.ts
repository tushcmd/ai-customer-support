import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { rating, feedback } = await req.json();

  // Validate rating and feedback
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
  }

  if (feedback && typeof feedback !== "string") {
    return NextResponse.json({ error: "Invalid feedback" }, { status: 400 });
  }

  try {
    const newFeedback = await prisma.feedback.create({
      data: {
        userId: session.user.id,
        rating,
        feedback: feedback || undefined, // Use undefined if feedback is an empty string
      },
    });

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
