import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'sonner'
import { useNavigate, useParams } from "react-router-dom";
import RTE from "../component/RTE";
import { useDispatch } from "react-redux";
import { postSuccess } from "../redux/reducer/postsSlice";
import { CreatePostType } from "@namratachandarana/medium-common";

interface PostType {
    post?: {
        title: string,
        content: string
    } 
}

const PublishComponenet =({post}: PostType ) => {

    const [createPost, setCreatePost] = useState<CreatePostType>({
        title: '',
        content: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(()=> {
        if(post){
            setCreatePost({
                title: post.title,
                content: post.content,
            })
        }
    },[dispatch, post, navigate])

    function handleContent(content: string){
        setCreatePost({
            ...createPost,
            content: content
        })
    }
    
    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
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
            setCreatePost({title: '', content: ''});
            console.log(res.data);
            
            if(res.data){
                const id = res.data.post.id;
                toast.success( res.data.message, { position: "top-center" });
                navigate(`/blog/${id}`)
            }
        }catch(e){
            toast.error("Something Went wrong", { position: "top-center" });
        } 
    }

    async function handleEdit(e: React.MouseEvent<HTMLButtonElement> ){
        e.preventDefault();
        
        try{
            const res = await axios.put(`${BACKEND_URL}/api/v1/post/blog`,{
                id: id,
                title:createPost.title,
                content:createPost.content,
            },{
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }
            })
            setCreatePost({
                title: "",
                content: ""
            })
            console.log(res);
            if(res.data){
                dispatch(postSuccess(res.data));
                toast.success( res.data.message, {position: "top-center"});
                navigate(`/blog/${id}`)

            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="flex flex-col justify-center items-center ">
            <input type="text" value={createPost.title || ''} onChange={(e) => setCreatePost({
                ...createPost,
                title: e.target.value
            })} className="lg:w-[65%] w-[95%] p-2 m-5 border border-gray-400 rounded-md" placeholder="Title"/>
            <div className="m-3">
                <RTE onContentChange={handleContent} initValue={createPost.content || ''} />
            </div>
            
            {
                (post) ?  
                    <div>
                        <button type="submit" onClick={handleEdit} className="font-georgian bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 border border-green-700 rounded mt-5">
                            Edit Post
                        </button>
                    </div>
                : 
                    <div>
                        <button type="submit" onClick={handleSubmit} className="font-georgian bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 border border-green-700 rounded">
                            Publish Post
                        </button>
                    </div>
            }    
        </div>
    )
}

export default PublishComponenet