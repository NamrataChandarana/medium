import Avtar from "./Avtar"
import { useDispatch} from "react-redux"
import { Link} from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { deletePostSuccess } from "../redux/reducer/postsSlice"
import { toast } from "sonner"
import { myPosts } from "../redux/actions"
import { myPostsSuccess } from "../redux/reducer/postsSlice"

interface profilePorps  {
    authorName: string,
    title: string,
    content: string | React.JSX.Element | React.JSX.Element[],
    publishedDate: Date,
    id: string
}

export const ProfileComponent= ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: profilePorps) => {

    const dispatch = useDispatch();
  
    async function deleteBlog (id: string) {
        try {
          const res = await axios.delete(`${BACKEND_URL}/api/v1/post/${id}`,{
            headers:{
              Authorization: localStorage.getItem("token")
            }
          })
          if(res.data.status == true){
            dispatch(deletePostSuccess());
            const fetchUser = async () => {
              const response = await myPosts();
              if (response !== null) {
                dispatch(myPostsSuccess(response))
              } else {
                toast.error('Failed to fetch user data');
              }
            }
            fetchUser();
            toast.success(res.data.message, { position: "top-center" });
      
          }else{
            toast.error(res.data.message, { position: "top-center"});
          }
        }catch(err){
          toast.error("Something went wrong!", {position: "top-center"});
        }
    }

    const time = new Date(publishedDate);
    return(

             <div className=" lg:min-w-[38rem] max-w-[38rem] md:col-span-8 col-span-12">
                <div className="flex flex-col space-y-2 p-6 border-b border-gray-200 ">
                    <div className="flex items-center space-x-1">
                        <Avtar name={authorName} size={"w-9 h-9"}/>
                        <span className="font-semibold text-gray-800">{authorName}</span>
                        <span className="text-sm text-gray-500 pt-1 ">&#8226; {time.getDate()}-{time.getMonth()}-{time.getFullYear()}</span>
                    </div>
                    <div className="text-xl font-bold text-gray-800">{title}</div>
                    <div className="text-gray-700 text-wrap overflow-hidden text-justify">
                        {typeof content === 'string' && (content.length > 100 )? `${content?.substring(0, 145)}...` : content}
                    </div>
                    <div className="text-gray-500 text-sm pt-5 flex space-x-2 ">
                        <Link to={`/blog/${id}`}>
                            <div className="border-b border-black text-black cursor-pointer">View</div>
                        </Link>
                        
                        <Link className="border-b border-black text-black cursor-pointer" to={`/edit/${id}`}>Edit</Link>
                        <button className="border-b border-black text-black cursor-pointer" onClick={() => deleteBlog(id)}>Delete</button>
                    </div>
                </div>
            </div>
    )
}