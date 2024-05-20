import Avtar from "./Avtar";
import { Link } from "react-router-dom";


const Appbar = ({name}: {name: string}) => {
        return (
            <>  
                <div className="flex justify-between px-10 py-2 h-15 w-full border-b border-gray-200 sticky top-0 bg-white z-[100]">
                    <div className="font-bold text-xl">Medium</div>
                    <div>
                    <Link to="/publish" className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-full mx-2">
                        Publish
                    </Link>
                        <Avtar name={name} size={"w-9 h-9"}/>
                    </div>
                </div>
                
            </>
        )
}

export default Appbar;