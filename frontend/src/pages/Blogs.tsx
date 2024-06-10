import BlogCard from "../component/BlogCard"
import axios from 'axios'
import { useEffect, useState} from 'react';
import {  toast } from 'sonner'
import Skeleton from "../component/BlogsSkeleton";
import { truncate } from "../component/TruncateText";
import { useDispatch } from "react-redux"; 
import { postsSuccess } from "../redux/reducer/postsSlice";
import Appbar from "../component/Appbar";

export interface Post{
  "content": string;
  "title": string;
  "id": string;
  "publishedDate": Date;
  "author": {
      "name": string;
  };
}

const Blogs= () => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [posts, setPosts] = useState<Post[]>();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    async function getBlogs () {
      try{
        const res = await axios.get(`${BACKEND_URL}/api/v1/post/bulk`,{
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
    
        if(res.data.posts){  //check when no any published post on db
          dispatch(postsSuccess(res.data.posts))
          setPosts(res.data.posts)
          setLoading(false)
        }
        
      }catch(err){
        toast.error("Something Went wrong", {position: "top-center"});
      }
    }
    
    function readTime(content: string){
      const wordsPerMinute = 250;
      const words = content.split('').length;
      const readingTimeMinutes = words / wordsPerMinute;
      const time = Math.ceil(readingTimeMinutes )
      return time
    }

    useEffect(()=>{
      getBlogs();
    },[dispatch])
      
    if(loading){
      return(
        <div>
          <Appbar/>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )
    }
    
    
    return (
      <>
        <Appbar />
         {posts && posts.map(post=>(
          <div className="flex place-content-center">
            <BlogCard
              authorName = {post.author.name || "Anonymous"}
              title = {post.title}   
              content = {truncate(post.content)}
              publishedDate = {post.publishedDate}
              id={post.id}
              readTime={readTime(post.content)}
            />
          </div>  
        ))}
         
      </>
    )
}

export default Blogs