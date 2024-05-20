

const Avtart = ({name, size}: {name: string, size: string}) => {
    return(
        <div className={`relative inline-flex items-center ${size} justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">
                {name.split(" ").map(word => word.charAt(0).toUpperCase()).join("")}
            </span>
        </div>
    )
}

export default Avtart