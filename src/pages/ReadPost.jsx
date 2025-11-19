import { useState, useEffect } from 'react'
import Card from '../components/card'
import { supabase } from '../client'
import { Link } from "react-router-dom"
const ReadPost = () => {
    const [posts, setPosts] = useState([])
    useEffect( () => {
        const fetchPosts = async () => {
            const { data } = await supabase
            .from('builds')
            .select('*')
            setPosts(data)
        }
        fetchPosts()
    }, [])
    return (
    <div className="readpost">
        {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => b.id - a.id)
                .map((post,index) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        title={post.title}
                        picture={post.picture}
                        notes={post.notes}
                        gpu_name={post.gpu_name}
                        gpu_price={post.gpu_price}
                        cpu_name={post.cpu_name}
                        cpu_price={post.cpu_price}
                        ram_name={post.ram_name}
                        ram_price={post.ram_price}
                        storage_name={post.storage_name}
                        storage_price={post.storage_price}
                        psu_name={post.psu_name}
                        psu_price={post.psu_price}
                        motherboard_name={post.motherboard_name}
                        motherboard_price={post.motherboard_price}
                        totalprice={post.gpu_price + post.cpu_price + post.ram_price + post.storage_price + post.psu_price + post.motherboard_price + post.case_price}
                        case_name={post.case_name}
                        case_price={post.case_price}
                        created_at={post.created_at}
                        upvotes={post.upvotes}
                    />
                ) : <h2>{'We don\'t have any posts yet.'}</h2>
            }
    </div>
    )
}
export default ReadPost