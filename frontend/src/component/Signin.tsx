import Quotes from "./Quotes"
import Input from "./Input"
import { SigninType } from "@namratachandarana/medium-common"
import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import {  toast } from 'sonner'
import { useDispatch } from "react-redux"
import { signin } from "../redux/reducer/userSlice"

export default function SigninComponent() {
  
  const [postInput, setPostInput] = useState<SigninType>({
    email: "",
    password: "",
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = localStorage.getItem("token");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if(postInput.email == "" || postInput.password =="") {
      toast.error("Please fill all the inputs", {position:"top-center" })
      return;
    }
    try{
      const res = await axios.post(`${BACKEND_URL}/api/v1/users/signin`,{
        email: postInput.email,
        password: postInput.password,
      })
      setPostInput({
        email: "",
        password: ""
      });

      if(res.data.jwt){
        const jwt = res.data.jwt;
        const token = `Bearer ${jwt}`
        localStorage.setItem("token", token);
        dispatch(signin(res.data))
        toast.success('Signin Successfully!',{ position: "top-center", className: "max-w-fit" })
        navigate('/blog');
      }
    }catch(err){
      toast.error("Incorrect Email Password",{ position: "top-center", className: "max-w-fit" })
    }
    
  }

  useEffect(()=>{
    if(authStatus) navigate('/blog')
   },[navigate])

  return (
    <div className="w-full gap-10 lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[600px]">
      <div className="flex items-center justify-center p-6 xl:p-10 ">
        <div className="mx-auto w-[350px] space-y-5 pt-5 border border-gray-200 rounded-md">
          <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Enter your email below to signin to your account
              </p>
          </div>
          <form className="space-y-4 pt-5">
            <Input 
            id="email"
            label="Email"
            type="text"
            placeholder="Your Email"
            onChange= {(e) => { setPostInput({...postInput, email: e.target.value }) }}
            value={postInput.email}
            />
            <Input 
            id="password"
            label="Password"
            type="password"
            placeholder="********"
            onChange= {(e) => { setPostInput({...postInput, password: e.target.value }) }}
            value={postInput.password}
            />
            <button onClick={handleSubmit} className=" hover:bg-[#2D2D2D] h-15 rounded-md m-5" type="submit" style={{width:"90%", backgroundColor: "#2D2D2D" ,color: "white", padding: "10px", marginBottom: "20px" }}>
                Sign In
            </button>
          </form>
          <p className="text-gray-500 dark:text-gray-400 mx-5 mb-5 text-center">
              Create a new Account?
              <Link className="underline" to="/signup">
                  Sign up
              </Link>
            </p>
        </div>
      </div>
      <Quotes/>
    </div>
  )
}