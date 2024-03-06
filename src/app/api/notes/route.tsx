import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(request: Request) {
  const { id, content } = await request.json();

  const { userId } = auth();
  if (!userId) return NextResponse.json({ success: false });

  const firestore = getFirestore();
  await firestore
    .collection("chefs")
    .doc(userId)
    .collection("notes")
    .doc(id)
    .set({
      ...content,
      updatedAt: Date.now().toString(),
    });

  return NextResponse.json({ success: true });
}
