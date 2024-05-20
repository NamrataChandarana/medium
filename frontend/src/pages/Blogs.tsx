import BlogCard from "../component/BlogCard"
import axios from 'axios'
import { useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from "../config";
import Appbar from "../component/Appbar";
import Skeleton from "../component/BlogsSkeleton";


// interface Blog {
//   "content": string;
//   "title": string;
//   "id": string; 
//   "author": {
//       "name": string
//   }
// }
const Blogs= () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    async function getBlogs() {
        try{
          const res = await axios.get(`${BACKEND_URL}/api/v1/post/bulk`,{
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });

          if(res.data.posts){  //check when no any published post on db
            setPosts(res.data.posts);
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
        getBlogs();
      },[])

      if(loading){
        return(
          <div>
            <Appbar name="Namu" />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            {/* <Skeleton /> */}
            {/* <Skeleton /> */}
          </div>
        )
      }

    return (
      <>
        <Appbar name="Namu" />
         {posts.map((post)=>(
          <div className="flex place-content-center">
            <BlogCard
            authorName = {post.author.name || "Anonymous"}
            title = {post.title}   
            content = {post.content}
            publishedDate = {"2nd nov"}
            id={post.id}
            />
          </div>  
        ))}
      </>
    )
}

export default Blogs