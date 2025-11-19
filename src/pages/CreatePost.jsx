import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import ImageUpload from "../components/ImageUpload";
import { AuthContext } from "../AuthContext";

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    notes: "",
    picture: "",
    gpu_name: "", gpu_price: 0,
    cpu_name: "", cpu_price: 0,
    ram_name: "", ram_price: 0,
    storage_name: "", storage_price: 0,
    psu_name: "", psu_price: 0,
    motherboard_name: "", motherboard_price: 0,
    case_name: "", case_price: 0,
  });

  // New state for external URL
  const [externalUrl, setExternalUrl] = useState("");

  const handleChange = (e) => {
    setPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Set post.picture from external URL
  const handleExternalUrl = () => {
    if (externalUrl.trim() === "") return;
    setPost(prev => ({ ...prev, picture: externalUrl }));
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login required");
    if (!post.title) return alert("Title is required");

    try {
      const { data, error } = await supabase
        .from("builds")
        .insert([{
          ...post,
          user_id: user.id,
          upvotes: 0,
        }])
        .select();

      if (error) {
        console.error("Insert error:", error);
        alert("Failed to create build. Check console.");
        return;
      }

      console.log("Inserted build:", data);
      navigate("/"); // go back to home after success
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <form onSubmit={createPost}>
      <label>Title*</label><br />
      <input name="title" value={post.title} onChange={handleChange} required /><br /><br />

      <label>Notes</label><br />
      <textarea name="notes" value={post.notes} onChange={handleChange} /><br /><br />

      <label>Picture (drag & drop or external URL)</label><br />
      <ImageUpload picture={post.picture} setPicture={(url) => setPost(prev => ({ ...prev, picture: url }))} /><br /><br />

      <input
        type="text"
        placeholder="Or enter external image URL"
        value={externalUrl}
        onChange={(e) => setExternalUrl(e.target.value)}
        style={{ width: "300px" }}
      />
      <button type="button" onClick={handleExternalUrl}>Use URL</button><br /><br />

      <h4>Components</h4>

      <label>GPU Name</label><br />
      <input name="gpu_name" value={post.gpu_name} onChange={handleChange} /><br />
      <label>GPU Price</label><br />
      <input type="number" name="gpu_price" value={post.gpu_price} onChange={handleChange} /><br /><br />

      <label>CPU Name</label><br />
      <input name="cpu_name" value={post.cpu_name} onChange={handleChange} /><br />
      <label>CPU Price</label><br />
      <input type="number" name="cpu_price" value={post.cpu_price} onChange={handleChange} /><br /><br />

      <label>RAM Name</label><br />
      <input name="ram_name" value={post.ram_name} onChange={handleChange} /><br />
      <label>RAM Price</label><br />
      <input type="number" name="ram_price" value={post.ram_price} onChange={handleChange} /><br /><br />

      <label>Storage Name</label><br />
      <input name="storage_name" value={post.storage_name} onChange={handleChange} /><br />
      <label>Storage Price</label><br />
      <input type="number" name="storage_price" value={post.storage_price} onChange={handleChange} /><br /><br />

      <label>PSU Name</label><br />
      <input name="psu_name" value={post.psu_name} onChange={handleChange} /><br />
      <label>PSU Price</label><br />
      <input type="number" name="psu_price" value={post.psu_price} onChange={handleChange} /><br /><br />

      <label>Motherboard Name</label><br />
      <input name="motherboard_name" value={post.motherboard_name} onChange={handleChange} /><br />
      <label>Motherboard Price</label><br />
      <input type="number" name="motherboard_price" value={post.motherboard_price} onChange={handleChange} /><br /><br />

      <label>Case Name</label><br />
      <input name="case_name" value={post.case_name} onChange={handleChange} /><br />
      <label>Case Price</label><br />
      <input type="number" name="case_price" value={post.case_price} onChange={handleChange} /><br /><br />

      <button type="submit">Create Build</button>
    </form>
  );
}
