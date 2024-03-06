"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs";
import { initAdmin } from "@/firebase/admin";
import { getFirestore } from "firebase-admin/firestore";

export const getForm = async (chefId: string, formId: string) => {
  await initAdmin();

  const firestore = getFirestore();
  const snap = await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("forms")
    .doc(formId)
    .get();
  const document = snap.data();

  return document;
};

export const getForms = async (chefId: string) => {
  await initAdmin();

  const firestore = getFirestore();
  const snap = await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("forms")
    .get();
  const documents = snap.docs.map((form: any) => ({
    id: form.id,
    ...form.data(),
  }));

  return documents;
};

export const postForm = async (chefId: string) => {
  await initAdmin();
  const firestore = getFirestore();
  const snap = await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("forms")
    .add({
      inputs: [],
      name: "New Form",
      submitMessage: "Thanks for your submission!",
      bgColor: "#f2f2ff",
      updatedAt: Date.now().toString(),
    });

  redirect(`/dashboard/forms/${snap.id}`);
};

export const putForm = async (formId: string, form: Form) => {
  await initAdmin();

  const { userId } = auth();
  const chefId = userId;
  if (!chefId) return null;

  const firestore = getFirestore();
  await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("forms")
    .doc(formId)
    .update({
      ...form,
      updatedAt: Date.now().toString(),
    });

  revalidatePath("/dashboard/forms");
  return;
};

export const getNote = async (noteId: string) => {
  await initAdmin();

  const { userId } = auth();
  const chefId = userId;
  if (!chefId) return null;

  const firestore = getFirestore();
  const snap = await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("notes")
    .doc(noteId)
    .get();
  const document = snap.data();

  return document;
};

export const getSubmissions = async () => {
  await initAdmin();

  const { userId } = auth();
  const chefId = userId;
  if (!chefId) return null;

  const firestore = getFirestore();
  const snap = await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("submissions")
    .get();
  const documents = snap.docs.map((submission: any) => ({
    id: submission.id,
    ...submission.data(),
  }));

  return documents || [];
};

export const postSubmission = async (chefId: string, submission: any) => {
  await initAdmin();

  const firestore = getFirestore();
  await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("submissions")
    .add({
      ...submission,
      submittedAt: Date.now().toString(),
    });

  const formId = submission.formId;

  revalidatePath("/dashboard");
  redirect(`/success/?chefId=${chefId}&formId=${formId}`);

  return;
};
