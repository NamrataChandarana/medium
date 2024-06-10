import { Link} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from "./Dropdown";

const Appbar = () => {
    
    const authStatus = localStorage.getItem("token");    

        return (
            <>  
                <div className="flex justify-between px-5 md:px-8 py-2 h-16 w-full border-b border-gray-200 sticky top-0 bg-white z-[100]">
                    <div className="font-bold text-xl my-1">
                        <Link to={authStatus? "/blog" : "/"}>DevTales</Link>
                    </div>
                    {
                        authStatus ? 
                            <div>
                                <Link to="/publish" className="font-georgian bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-full mx-2">
                                    Publish
                                </Link>
                                <Dropdown />
                            </div>
                            :
                            <div className="my-1 ">
                                <button className="font-georgian bg-black hover:bg-black text-white font-semibold py-2 px-1 rounded-md mx-2 md:px-6 md:py-3 text-sm md:text-md">
                                    <Link to="/signup">Get Started 	&rarr;</Link> 
                                </button>
                                <Link to="/signin" className="font-georgian bg-gray-200 hover:bg-gray-200 text-black font-semibold py-2 md:px-6 md:py-3 px-2 rounded-md text-sm md:text-md">
                                    <Link to="/signin">Sign in</Link>
                                
                                </Link>
                            </div>
                    }
                    
                    
                </div>
            </>
        )
}

export default Appbar;