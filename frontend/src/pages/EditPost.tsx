// import { CreatePostType } from "@namratachandarana/medium-common";
import axios from "axios";
import { useEffect } from "react";
import {  toast } from 'sonner'
import { useParams } from "react-router-dom";
import Appbar from "../component/Appbar";
import { useDispatch, useSelector } from "react-redux";
import PublishComponenet from "../component/PublishComponent";
import { PostState, postSuccess } from "../redux/reducer/postsSlice";

const EditPost = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    async function getBlog() {
        try{
          const res = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`,{
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });

          if(res.data.post){  //check when no any published post on db
            dispatch(postSuccess(res.data.post))
          }
          
        }catch(err){
            toast.error('Something went wrong!',{ position: "top-center"})
        }
    }

    useEffect(() => {
        getBlog()
    },[id])

    const post = useSelector((state: {postData: PostState }) => state.postData.post);
    
    
    return(
        <>
            <Appbar />
            <PublishComponenet post={post}/>
        </>
    )
}

export default EditPost;