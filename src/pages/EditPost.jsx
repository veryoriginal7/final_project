import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';
import ImageUpload from "../components/ImageUpload";

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: '',
        picture: '',
        created_at: '',
        notes: '',
        gpu_name: '',
        gpu_price: 0,
        cpu_name: '',
        cpu_price: 0,
        ram_name: '',
        ram_price: 0,
        storage_name: '',
        storage_price: 0,
        psu_name: '',
        psu_price: 0    ,
        motherboard_name: '',
        motherboard_price: 0,
        case_name: '',
        case_price: 0,
    })
    const [loading, setLoading] = useState(true);
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
            case_price: Number(data.case_price)
        });
        setLoading(false);
    };
    fetchPost();
    }, [id]);
    const handleChange = (event) => {
    const { name, value } = event.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  const updatePost = async (event) => {
    event.preventDefault();
    await supabase
      .from('builds')
      .update({ 
        title: post.title,
            picture: post.picture,
            notes: post.notes,
            gpu_name: post.gpu_name,
            gpu_price: Number(post.gpu_price),
            cpu_name: post.cpu_name,
            cpu_price: Number(post.cpu_price),
            ram_name: post.ram_name,
            ram_price: Number(post.ram_price),
            storage_name: post.storage_name,
            storage_price: Number(post.storage_price),
            psu_name: post.psu_name,
            psu_price: Number(post.psu_price),
            motherboard_name: post.motherboard_name,
            motherboard_price: Number(post.motherboard_price),
            case_name: post.case_name,
            case_price: Number(post.case_price)
       })
      .eq('id', id);

    window.location = '/';
  };
  const deletePost = async (event) => {
    event.preventDefault();
    const { error } = await supabase.from('builds').delete().eq('id', id);
    if (error) console.error(error);
    else window.location = '/';
  };
  if (loading) return <div>Loading...</div>;
  return(
    <div>
      <form>
        <label htmlFor="Title">Title</label><br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>
                <label>Picture</label><br />
                {/* Drag and drop image uploader */}
                <ImageUpload
                picture={post.picture}
                setPicture={(url) => setPost((prev) => ({ ...prev, picture: url }))}
                /><br />
                <label htmlFor="Notes">Notes</label><br />
                <textarea id="notes" name="notes" value={post.notes} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Gpu_name">GPU Name</label><br />
                <input type="text" id="gpu_name" name="gpu_name" value={post.gpu_name} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Gpu_price">GPU Price</label><br />
                <input type="number" id="gpu_price" name="gpu_price" value={post.gpu_price} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Cpu_name">CPU Name</label><br />
                <input type="text" id="cpu_name" name="cpu_name" value={post.cpu_name} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Cpu_price">CPU Price</label><br />
                <input type="number" id="cpu_price" name="cpu_price" value={post.cpu_price} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Ram_name">RAM Name</label><br />
                <input type="text" id="ram_name" name="ram_name" value={post.ram_name} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Ram_price">RAM Price</label><br />
                <input type="number" id="ram_price" name="ram_price" value={post.ram_price} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Storage_name">Storage Name</label><br />
                <input type="text" id="storage_name" name="storage_name" value={post.storage_name} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Storage_price">Storage Price</label><br />
                <input type="number" id="storage_price" name="storage_price" value={post.storage_price} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Psu_name">PSU Name</label><br />
                <input type="text" id="psu_name" name="psu_name" value={post.psu_name} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Psu_price">PSU Price</label><br />
                <input type="number" id="psu_price" name="psu_price" value={post.psu_price} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Motherboard_name">Motherboard Name</label><br />
                <input type="text" id="motherboard_name" name="motherboard_name" value={post.motherboard_name} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Motherboard_price">Motherboard Price</label><br />
                <input type="number" id="motherboard_price" name="motherboard_price" value={post.motherboard_price} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Case_name">Case Name</label><br />
                <input type="text" id="case_name" name="case_name" value={post.case_name} onChange={handleChange} /><br />
                <br/>
                <label htmlFor="Case_price">Case Price</label><br />
                <input type="number" id="case_price" name="case_price" value={post.case_price} onChange={handleChange} /><br />
                <br/>
                <input type="submit" value="Submit" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
      </form>
    </div>
  )
}
export default EditPost;