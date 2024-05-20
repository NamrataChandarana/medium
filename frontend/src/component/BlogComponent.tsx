import Avtar from "./Avtar"

interface blogContent {
    title: string,
    content: string,
    published: string,
    authorName: string,
}
export const BlogComponent= ({title, published, content, authorName}: blogContent) => {
    return(
        <div className="m-[50px] grid grid-cols-12 space-x-12 md:m-[60px]">
            <div className="md:col-span-8 col-span-12">
                <div className="font-bold text-4xl mb-2">{title}</div>
                <span className="text-md text-gray-400  ">Posted on {published}</span>
                <div className="mt-6 text-gray-700">{content}</div>
            </div>
            <div className="hidden md:block md:col-span-4">
                <div className="mb-4 font-semibold">Author</div>
                <div className="flex items-center space-x-1 mb-4">
                    <Avtar name="Namrata" size={"w-9 h-9"}/>
                    <div className="font-bold text-gray-800">{authorName}</div>
                </div>
                    <div className=" text-gray-500">Master of mirth, purveyor of puns, and the funniest person in the kingdom</div>
            </div>
        </div>
    )
}