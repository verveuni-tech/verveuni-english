export const uploadToCloudinary = async (audioBlob, sessionId) => {
  const formData = new FormData();

  formData.append("file", audioBlob);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append("public_id", `sessions/${sessionId}`);
  formData.append("resource_type", "video"); // Cloudinary treats audio as video

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();

  return {
    url: data.secure_url,
    duration: data.duration, // VERY important for analysis
    bytes: data.bytes,
  };
};
