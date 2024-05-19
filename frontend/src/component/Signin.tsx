import Quotes from "./Quotes"
import Auth from "./Auth"
import Input from "./Input"
import { SigninType } from "@namratachandarana/medium-common"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SigninComponent() {

  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SigninType>({
    email: "",
    password: "",
  })

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInput(prev => ({
      ...prev,
      email: e.target.value,
    }))};
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInput(prev => ({
      ...prev,
      password: e.target.value,
    }))};

  async function handleSubmit(e: any) {
    e.preventDefault();
    try{
      const res = await axios.post('http://127.0.0.1:8787/api/v1/users/signin',{
        email: postInput.email,
        password: String(postInput.password),
      })
      // setPostInput("");

      if(res.data.jwt){
        const jwt = res.data.jwt;
        localStorage.setItem("token", jwt);
        navigate('/');
        toast.success( "signup successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          return;
      }else{
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      
    }catch(err){
      console.log(err);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  return (
    <div className="w-full gap-10 lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[600px]">
      <div className="flex items-center justify-center p-6 xl:p-10">
        <div className="mx-auto w-[350px] space-y-6">
          <Auth />
          <form className="space-y-4">
            <Input 
            id="email"
            label="Email"
            type="text"
            placeholder="namrata@gmail.com"
            onChange= {handleEmailChange}
            value={postInput.name}
            />
            <Input 
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange= {handlePasswordChange}
            value={postInput.password}
            />
            <button className="w-full bg-black h-15" onClick={handleSubmit} type="submit" style={{ backgroundColor: "black" ,color: "white", padding: "10px"}}>
              Sign up
            </button>
          </form>
        </div>
      </div>
      <Quotes/>
    </div>
  )
}