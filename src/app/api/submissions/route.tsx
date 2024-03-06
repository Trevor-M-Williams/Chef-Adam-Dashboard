import { NextResponse } from "next/server";
import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const submissions = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error getting documents: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
