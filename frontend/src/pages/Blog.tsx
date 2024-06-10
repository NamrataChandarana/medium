import axios from 'axios'
import { useEffect, useState} from 'react';
import {  toast } from 'sonner'
import { useParams } from 'react-router-dom';
import {BlogComponent} from '../component/BlogComponent'
import { BlogSkeleton } from '../component/BlogSkeleton';
import { useDispatch } from 'react-redux';
import { postSuccess } from '../redux/reducer/postsSlice';
import Appbar from '../component/Appbar';

const Blog = () =>{
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const dispatch = useDispatch();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    
    async function getBlog(){
        try{
          const res = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`,{
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });

          if(res.data.post){  
            dispatch(postSuccess(res.data.post))
            setLoading(false)
          }
          
        }catch(err){
          toast('Something went wrong!',{ position: "top-center", className: "max-w-fit" })
        }
    }

    useEffect(()=>{
      getBlog();
    },[dispatch])

    if(loading){
      return(
        <>
          <Appbar/>
          <BlogSkeleton />
        </>
        
      )
    }

    return(
      <>
        <div>
            <Appbar/>
            <div className='flex justify-center md:justify-start'>
              <BlogComponent />
            </div>
            
        </div>
      </>
    )
}

export default Blog