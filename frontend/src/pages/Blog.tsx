import axios from 'axios'
import { useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from "../config";
import { useParams } from 'react-router-dom';
import {BlogComponent} from '../component/BlogComponent'
import Appbar from '../component/Appbar';
import { BlogSkeleton } from '../component/BlogSkeleton';

// interface Blog {
//     id: string,

// }
const Blog = () =>{
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    
    async function getBlog() {
        try{
          const res = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`,{
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
          console.log(res);

          if(res.data.post){  //check when no any published post on db
            setPost(res.data.post);
            setLoading(false)
          }
          
        }catch(err){
          toast.error("Something Went wrong", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      }

      useEffect(()=>{
        getBlog();
      },[])

      if(loading){
        return(
          <>
            <Appbar name="Namu" />
            <BlogSkeleton />
          </>
          
        )
      }
    return(
      <>
        <Appbar name={"Namu"} />
        <div>
            <BlogComponent 
            title={post.title}
            content={post.content}
            authorName = {post.author.name || "Anonymous"}
            published={"2 Feb,2024"}
            />
        </div>
      </>
    )
}

export default Blog