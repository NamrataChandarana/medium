// import { CreatePostType } from "@namratachandarana/medium-common";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Publish = () => {

    const [createPost, setCreatePost] = useState({
        title: '',
        content: '',
    });
    const navigate = useNavigate();
    
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const res = await axios.post(`${BACKEND_URL}/api/v1/post/blog`,{
                title:createPost.title,
                content:createPost.content,
            },{
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }
            });
            setCreatePost("");
    
            if(res.data){
                navigate("/")
                toast.success( "Post Created!", {
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
        }catch(e){
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
    
    return(
        <>
            <input type="text" onChange={(e) => setCreatePost({
                ...createPost,
                title: e.target.value
            })} />
            <input type="text" onChange={(e) => setCreatePost({
                ...createPost,
                content: e.target.value
            })} />
            <button type="submit" onClick={handleSubmit}>Publish Post</button>
        </>
    )
}

export default Publish;