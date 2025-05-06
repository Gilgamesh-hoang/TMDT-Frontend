import { useUploadImageMutation } from "@/api/adminApi/product";
import { useState } from "react";

export const Test = () => {
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const response = await uploadImage(file).unwrap();
      setUploadedUrl(response.data.url);
    } catch (err) {
      alert("Upload failed");
    }
  };
  return (
    <div className="p-4 border rounded w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {isLoading && <p>Uploading...</p>}
      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Uploaded Image:</p>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="mt-2 w-48 h-48 object-cover rounded border"
          />
        </div>
      )}
    </div>
  );
};
