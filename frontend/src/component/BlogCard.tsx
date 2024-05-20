import { Link } from "react-router-dom"
import Avtar from "./Avtar"

interface BlogCardPorps  {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

const BlogCard= ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardPorps) => {
    

    return (
        <>  
        <Link to={`/blog/${id}`}>
            <div className=" mx-10 min-w-[38rem] max-w-[38rem]">
                <div className="flex flex-col space-y-2 p-6 border-b border-gray-200 ">
                    <div className="flex items-center space-x-1">
                        <Avtar name={authorName} size={"w-9 h-9"}/>
                        <span className="font-semibold text-gray-800">{authorName}</span>
                        <span className="text-sm text-gray-500 pt-1 ">&#8226; {publishedDate}</span>
                    </div>
                    <div className="text-xl font-bold text-gray-800">{title}</div>
                    <div className="text-gray-700 text-wrap overflow-hidden text-justify">
                        {content.length > 100 ? `${content.substring(0, 145)}...` : content}
                    </div>
                    <div className="text-gray-500 text-sm pt-5">{`${Math.ceil(content.length / 100 )} min read`}</div>
                </div>
            <div></div>
            </div>
        </Link>
            

            
        </>
    )
}
export default BlogCard