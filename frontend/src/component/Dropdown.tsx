import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, UserState } from "../redux/reducer/userSlice";
import { toast } from 'sonner';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BACKEND_URL } from "../config";
import Avtar from "./Avtar";
import { getUser } from "../redux/actions";
import { loadUser } from "../redux/reducer/userSlice";
import { useEffect } from "react";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const authStatus = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  
    useEffect(()=>{
      const fetchUser = async () => {
        const res = await getUser();
        if (res !== null) {
          dispatch(loadUser(res))
        } else {
          console.log('Failed to fetch user data');
          
        }
      };
      fetchUser();
    },[dispatch])
    const user = useSelector((state: {userData: UserState}) => state.userData.user)

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    async function Logout(){
        const res = await axios.post(`${BACKEND_URL}/api/v1/users/logout`);
        if(res){
            localStorage.removeItem("token");
            dispatch(logout());
            navigate('/')
            toast.success( "logout successfully", {position: "top-center"});
        }
    }

  return (
    <div className="relative inline-block text-center">
      <div>
          <button
              type="button"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={toggleDropdown}
          >
          {user && <Avtar name={user.name || "Anonymous"} size={"w-9 h-9"}/>}
          </button>
      </div>
        {isOpen && (
            <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
            >
                <div className="py-1" role="none">
                    <Link
                        to='/profile'
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                        role="menuitem"
                        id="menu-item-0"
                    >
                    Profile
                    </Link>
                    {/* <form method="POST" action="#" role="none"> */}
                    {
                        authStatus ? 
                        <button
                            // to='/signin'
                            className="text-gray-700 hover:bg-gray-100 block w-full text-center px-4 py-2 text-sm"
                            role="menuitem"
                            id="menu-item-3"
                            onClick={Logout}
                        >
                            Logout
                        </button>:null
                    }

                </div>
            </div>
        )}
    </div>
  );
};

export default Dropdown;
