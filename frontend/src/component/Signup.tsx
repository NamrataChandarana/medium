import Quotes from "./Quotes"
import Auth from "./Auth"
import Input from "./Input"
import { SignupType } from "@namratachandarana/medium-common"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from "../config"
export default function SignupComponent() {

  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupType>({
    email: "",
    password: "",
    name: ""
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInput(prev => ({
      ...prev,
      name: e.target.value,
    }))};
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
    console.log(postInput);
    try{
      const res = await axios.post(`${BACKEND_URL}/api/v1/users/signup`,{
        name: postInput.name,
        email: postInput.email,
        password: String(postInput.password),
      })
      setPostInput("");
      console.log(res)

      if(res.data.jwt){
        console.log("hello")
        const jwt = res.data.jwt;
        const token = `Bearer ${jwt}`
        localStorage.setItem("token", token);
        navigate('/');
        toast.success('Signup Successfully!', {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          return;
      }else{
        console.log(res);
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
      toast.error("Something Went wrong", {
        position: "top-center",
        autoClose: 5000,
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
         <div></div>
          <form className="space-y-4">
            <Input 
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            onChange= {handleNameChange}
            value={postInput.name}
            />
            <Input 
            id="email"
            label="Email"
            type="text"
            placeholder="namrata@gmail.com"
            onChange= {handleEmailChange}
            value={postInput.email}
            />
            <Input 
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange= {handlePasswordChange}
            value={postInput.password}
            />
            <button onClick={handleSubmit} className="w-full bg-black h-15" type="submit" style={{ backgroundColor: "black" ,color: "white", padding: "10px"}}>
              Sign up
            </button>
          </form>
        </div>
      </div>
      <Quotes />
    </div>
  )
}