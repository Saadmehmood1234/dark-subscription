"use server";
import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Contact } from "@/model/Contact";
interface ContactData {
  // name: string;
  // email: string;
  message: string;
  subject: string;
}

export const contactUs = async (data: ContactData) => {
  const sension = await getServerSession(authOptions);
  if (!sension?.user?.email) {
    return { success: false, message: "Signin to continue", status: 401 };
  }
  try {
    await dbConnect();
    const newData = {
      message: data.message,
      subject: data.subject,
      email: sension.user.email,
      name: sension.user.name,
    };
    const contactModel = await Contact.create(newData);

    return {
      success: true,
      message: "Contact data saved successfully",
      status: 200,
    };
  } catch (error: any) {
    console.error("Error in contactUs:", error);
    return { success: false, message: "Server Error", status: 500 };
  }
};
