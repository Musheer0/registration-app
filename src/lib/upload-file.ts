"use server";

import cloudinary from "@/lib/cloudinary";

const MAX_SIZE = 4 * 1024 * 1024; // 4MB

export async function uploadBytesToCloudinary(
  fileBytes: Uint8Array,
  fileType: string // e.g. "image/png" or "image/jpeg"
) {
  // 1️⃣ Size check
  if (fileBytes.length > MAX_SIZE) {
    throw new Error("File too thicc. Max allowed is 4MB.");
  }

  // 2️⃣ Type check (you can expand this)
  const allowed = ["image/png", "image/jpeg", "image/webp"];
  if (!allowed.includes(fileType)) {
    throw new Error("Bro what even is this file type?");
  }

  // 3️⃣ Convert bytes → Base64
  const base64 = Buffer.from(fileBytes).toString("base64");
  const dataURI = `data:${fileType};base64,${base64}`;

  // 4️⃣ Upload to Cloudinary
  const uploaded = await cloudinary.uploader.upload(dataURI, {
    folder: "next_uploads",
    resource_type: "auto",
  });

  return {
    url: uploaded.secure_url,
    public_id: uploaded.public_id,
  };
}
