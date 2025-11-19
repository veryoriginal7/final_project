import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';
import ImageUpload from "../components/ImageUpload";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: '',
    picture: '',
    notes: '',
    gpu_name: '', gpu_price: 0,
    cpu_name: '', cpu_price: 0,
    ram_name: '', ram_price: 0,
    storage_name: '', storage_price: 0,
    psu_name: '', psu_price: 0,
    motherboard_name: '', motherboard_price: 0,
    case_name: '', case_price: 0,
  });
  const [loading, setLoading] = useState(true);
  const [externalUrl, setExternalUrl] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setPost({
        title: data.title,
        picture: data.picture,
        notes: data.notes,
        gpu_name: data.gpu_name,
        gpu_price: Number(data.gpu_price),
        cpu_name: data.cpu_name,
        cpu_price: Number(data.cpu_price),
        ram_name: data.ram_name,
        ram_price: Number(data.ram_price),
        storage_name: data.storage_name,
        storage_price: Number(data.storage_price),
        psu_name: data.psu_name,
        psu_price: Number(data.psu_price),
        motherboard_name: data.motherboard_name,
        motherboard_price: Number(data.motherboard_price),
        case_name: data.case_name,
        case_price: Number(data.case_price),
      });

      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleExternalUrl = () => {
    if (externalUrl.trim() === "") return;
    setPost(prev => ({ ...prev, picture: externalUrl }));
  };

  const updatePost = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('builds')
      .update({ ...post })
      .eq('id', id);

    if (error) console.error(error);
    else navigate(`/build/${id}`);
  };

  const deletePost = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('builds').delete().eq('id', id);
    if (error) console.error(error);
    else navigate('/');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form>
      <label>Title</label><br />
      <input name="title" value={post.title} onChange={handleChange} /><br /><br />

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

      <button type="button" onClick={updatePost}>Update Build</button>
      <button type="button" onClick={deletePost} style={{ marginLeft: '10px' }}>Delete Build</button>
    </form>
  );
};

export default EditPost;