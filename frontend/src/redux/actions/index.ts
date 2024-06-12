import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { PostType} from "../reducer/postsSlice";
import { User } from "../reducer/userSlice";

export const getUser = async(): Promise<User> => {
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/profile`,{
        headers:{
          Authorization: localStorage.getItem("token")
        }
      })
      if(res){
        const response: User = res.data.user;
        return response;
        console.log(response)
      }else{
        throw new Error("Something went wrong!")
      }
      
      // dispatch(loadUser(res.data.user));
      
    }catch(error){
      console.log(error)
      throw new Error("Something went wrong!")
    }
  }


export const myPosts = async(): Promise<PostType[]> => {

  try{

    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/blog/myBlogs`,{
      headers:{
        Authorization: localStorage.getItem("token")
      }
    })

    if(res){
      const response: PostType[] = res.data.posts;
      return response
      // dispatch(myPostsSuccess(res.data.posts));
    }else{
      throw new Error("Something went wrong!")
    }

  }catch(error){
    console.log(error)
    throw new Error("Something went wrong!")
  }
}



