import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../client";
import './ImageUpload.css';
export default function ImageUpload({ picture, setPicture }) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
  const file = acceptedFiles[0];
  if (!file) return;

  setUploading(true);

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `builds/${fileName}`;

  // Upload file
  const { error: uploadError } = await supabase.storage
    .from("build-images")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error("Upload error:", uploadError.message);
    setUploading(false);
    return;
  }

  // Get public URL correctly
  const { data: { publicUrl }, error: urlError } = supabase.storage
    .from("build-images")
    .getPublicUrl(filePath);

  if (urlError) {
    console.error("Public URL error:", urlError.message);
    setUploading(false);
    return;
  }

  setPicture(publicUrl);
  setUploading(false);
}, [setPicture]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #aaa",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        marginBottom: "10px",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here ...</p> : <p>Drag & drop an image here, or click to select</p>}
      {uploading && <p>Uploading...</p>}
      {picture && <img src={picture} alt="uploaded" style={{ width: "200px", marginTop: "10px" }} />}
    </div>
  );
}