import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./client";
import { AuthContext } from "./AuthContext";

export default function BuildDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [build, setBuild] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBuild = async () => {
      const { data, error } = await supabase
        .from("builds")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setBuild(data);
    };

    fetchBuild();
  }, [id]);
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*, user_id")
        .eq("build_id", id)
        .order("created_at", { ascending: true });

      if (error) console.error(error);
      else setComments(data);
    };

    fetchComments();
  }, [id]);


const handleCommentSubmit = async (e) => {
  e.preventDefault();

  if (!user) return alert("You must be logged in to comment");

  console.log("submitting comment:", { build_id: id, user_id: user.id });

  const { data, error } = await supabase
    .from("comments")
    .insert({
      build_id: id,
      user_id: user.id,
      comment: newComment,
    })
    .select();

  if (error) {
    console.error("Insert error:", error);
    alert("Failed to add comment. Check console.");
    return;
  }

  setComments((prev) => [...prev, data[0]]);
  setNewComment("");
};

  if (!build) return <div>Loading...</div>;

  return (
    <div>
      <h2>{build.title}</h2>
      <img src={build.picture} alt={build.title} style={{ width: "300px" }} />
      <p>{build.notes}</p>

      <h3>Components:</h3>
      <ul>
        <li>GPU: {build.gpu_name} - ${build.gpu_price}</li>
        <li>CPU: {build.cpu_name} - ${build.cpu_price}</li>
        <li>RAM: {build.ram_name} - ${build.ram_price}</li>
        <li>Storage: {build.storage_name} - ${build.storage_price}</li>
        <li>PSU: {build.psu_name} - ${build.psu_price}</li>
        <li>Motherboard: {build.motherboard_name} - ${build.motherboard_price}</li>
        <li>Case: {build.case_name} - ${build.case_price}</li>
      </ul>

      <h3>Comments:</h3>
      <ul>
        {comments.map((c, idx) => (
          <li key={idx}>
            <strong>{c.created_at}</strong>: {c.comment}
          </li>
        ))}
      </ul>
      {user && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            required
          ></textarea>
          <br />
          <button type="submit">Post Comment</button>
        </form>
      )}
    </div>
  );
}