import Avtar from "./Avtar"
import { useSelector } from "react-redux";
import parse from 'html-react-parser';

export const BlogComponent= () => {

    const post = useSelector(((state: any) => state.postData.post))

    return(
        <div className="m-[50px] grid grid-cols-12 space-x-12 md:m-[60px]">
            <div className="md:col-span-8 col-span-12">
                <div className="font-bold text-4xl mb-2">{post.title}</div>
                <span className="text-md text-gray-400  ">Posted on 2 Nov, 2024</span>
                <div className="mt-6 text-gray-700">{parse(post.content)}</div>
            </div>
            <div className="hidden md:block md:col-span-4">
                <div className="mb-4 font-semibold">Author</div>
                <div className="flex items-center space-x-1 mb-4">
                    <Avtar name="Namrata" size={"w-9 h-9"}/>
                    <div className="font-bold text-gray-800">{post.author.name}</div>
                </div>
                    <div className=" text-gray-500">Random catch phrase about the author's ability to grab the user's attention</div>
            </div>
        </div>
    )
}