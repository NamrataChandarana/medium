import { useDispatch, useSelector } from "react-redux";
import { ProfileComponent } from "../component/ProfileComponent";
import { useEffect, useState  } from "react";
import { getUser, myPosts } from "../redux/actions";
import { ProfileSkeleton } from "../component/ProfileSkeleton";
import Avtar from "../component/Avtar";
import { myPostsSuccess, PostState } from "../redux/reducer/postsSlice";
import { UserState, loadUser } from "../redux/reducer/userSlice";
import Appbar from "../component/Appbar";
import { truncate } from "../component/TruncateText";

const Profile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchUser = async () => {
          const response = await myPosts();
          if (response !== null) {
            dispatch(myPostsSuccess(response))
          }
          const res = await getUser();
          if (res !== null) {
            dispatch(loadUser(res))
          } 
          setLoading(false)
        };
        fetchUser();
    },[dispatch])

    const posts = useSelector(((state: {postData: PostState}) => state.postData.myposts))
    const user = useSelector((state: {userData: UserState}) => state.userData.user)

    if(loading){
        return (
            <>
                <Appbar />
                <ProfileSkeleton />
            </>
        )
    }

    return(
        <>
            <Appbar />
            <div className="m-[50px] grid grid-cols-12 space-x-12 md:m-[60px]">
                <div className=" sm:min-w-[30rem] lg:min-w-[38rem] max-w-[38rem] md:col-span-8 col-span-12">
                    <div className="mb-4 font-bold text-3xl text-center md:text-left  ">Your Stories</div>
                    { posts?.length > 0 ?
                        posts.map((post)=>(
                            <div className="flex justify-center md:justify-start">
                                <ProfileComponent
                                authorName = {post.author.name || "Anonymous"}
                                title = {post.title}   
                                content = {truncate(post.content)}
                                publishedDate = {post.publishedDate}
                                id={post.id}
                                />
                            </div> 
            
                    )): 
                        <div className="text-center font-semibold text-3xl mt-20">No post yet!</div>
                    }
                </div>
        
                <div className="hidden md:block md:col-span-4">
                    <div className="mb-4 font-bold text-lg">About</div>
                    <div className="flex items-center space-x-1 mb-4">
                        {user && <Avtar name={user?.name} size={"w-9 h-9"}/>}
                        <div className="font-bold text-gray-800">{user?.name}</div>
                    </div>
                    <div className=" text-gray-500">Random catch phrase about the author's ability to grab the user's attention</div>
                </div>
            </div>
        </>
    )
}

export default Profile