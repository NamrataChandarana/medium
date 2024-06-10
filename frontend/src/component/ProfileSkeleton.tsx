
// import Avtar from "./Avtar"

export const ProfileSkeleton = () =>{
    return(
        <>
            <div className="m-[50px] grid grid-cols-12 space-x-12 md:m-[60px]">
                <div className="md:col-span-8 col-span-12">
                    <div className="lg:min-w-[38rem] max-w-[38rem]">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2 w-32"></div>
                        <div className="flex flex-col space-y-2 p-6 border-b border-gray-200 ">
                            <div className="flex items-center space-x-1">
                                <div className="flex items-center justify-center h-15 mb-2 bg-gray-300 rounded-full dark:bg-gray-700">
                                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                    </svg>
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            </div>
                            <div className="text-xl font-bold text-gray-800">
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2"></div>
                            </div>
                            <div className="text-gray-700 text-wrap overflow-hidden text-justify">
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                            </div>
                            <div className="text-gray-700 text-wrap overflow-hidden text-justify mb-5">
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block md:col-span-4">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11 mb-2"></div>
                        <div className="flex items-center space-x-1 mb-4">
                            <div className="flex items-center space-x-1">
                                <div className="flex items-center justify-center h-15 mb-2 bg-gray-300 rounded-full dark:bg-gray-700">
                                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                    </svg>
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                </div>
            </div>
        </>
    )
}