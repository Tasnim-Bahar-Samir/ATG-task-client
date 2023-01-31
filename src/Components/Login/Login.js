import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { json, Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm();
    const handleLogin= (data)=>{
        console.log(data)
        fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success){
                localStorage.setItem('auth_token',data.data)
                localStorage.setItem('loggedIn',true)
                // navigate('/profile')
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        })
    }
  return (
    <div>
        <form onSubmit={handleSubmit(handleLogin)} className="mx-auto border-2 p-5 rounded-md mt-14 text-left md:w-[500px]" >
            <h3 className='text-2xl font-semibold my-3'>Login</h3>
          
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email Address is required" })}
              type="email"
              className="input input-bordered w-full"
              aria-invalid={errors.email ? "true" : "false"} 
            />
            {errors.email && <p className="text-red-600" role="alert">{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", { required: "Password is required",minLength: {value:6,message:"Password should be atleast 6 characters."} })}
              type={`${showPass? 'text' :'password'}`}
              className="input input-bordered w-full"
              aria-invalid={errors.password ? "true" : "false"} 
            />
            <div className='mt-2'>
                <input onChange={()=>setShowPass(!showPass)} type="checkbox" /> show password
            </div>
            {errors.password && <p className="text-red-600" role="alert">{errors.password?.message}</p>}
          </div>
          
          <button type="submit" className="btn btn-success w-full mt-4">Sign In</button>
          <p className="text-center text-sm mt-[6px]">Don't have any account?<Link to='/register' className=" text-secondary">Register</Link></p>
        </form>
    </div>
  )
}

export default Login