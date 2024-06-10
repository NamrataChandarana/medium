import { Link } from "react-router-dom"
import Avtar from "./Avtar"

interface BlogCardPorps  {
    authorName: string,
    title: string,
    content: string  | React.JSX.Element | React.JSX.Element[],
    publishedDate: Date,
    id: string,
    readTime: number
}

const BlogCard= ({
    authorName,
    title,
    content,
    publishedDate,
    id,
    readTime
}: BlogCardPorps) => {
    
const time = new Date(publishedDate);
    return (
        <>  
        <Link to={`/blog/${id}`}>
            <div className=" lg:min-w-[38rem] max-w-[38rem]">
                <div className="flex flex-col space-y-2 p-6 border-b border-gray-200 ">
                    <div className="flex items-center space-x-1">
                        <Avtar name={authorName} size={"w-9 h-9"}/>
                        <span className="font-semibold text-gray-800">{authorName}</span>
                        <span className="text-sm text-gray-500 pt-1 ">&#8226; {time.getDate()}-{time.getMonth()}-{time.getFullYear()} </span>
                    </div>
                    <div className="text-xl font-bold text-gray-800">{title}</div>
                    <div className="text-gray-700 text-wrap overflow-hidden text-justify">
                    {content}   
                    </div>
                    <div className="text-gray-500 text-sm pt-5">{`${readTime} min read`}</div>
                </div>
            <div></div>
            </div>
        </Link>
            

            
        </>
    )
}
export default BlogCard