import React from 'react'
import {useForm} from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    // const navigate = useNavigate()


    const handleRegister  = (data)=>{
        console.log(data)
        console.log(data.email,data.password)
        fetch('http://localhost:5000/users',{
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
          if(data.success){
            toast.success("Registration complete. Login Now.")
            // navigate('/login')
          }else{
            toast.error(data.message)
          }
        })
    }


  return (
    <div>
        <form onSubmit={handleSubmit(handleRegister)} className="mx-auto border-2 p-5 rounded-md mt-14 text-left md:w-[500px]" >
            <h3 className='text-2xl font-semibold  my-3'>Register</h3>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input input-bordered w-full"
              aria-invalid={errors.name ? "true" : "false"} 
            />
            {errors.name && <p className="text-red-600" role="alert">{errors.name?.message}</p>}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              {...register("phone", { required: "Phone is required" })}
              type="text"
              className="input input-bordered w-full"
              aria-invalid={errors.phone ? "true" : "false"} 
            />
            {errors.phone && <p className="text-red-600" role="alert">{errors.phone?.message}</p>}
          </div>
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
              type="password"
              className="input input-bordered w-full"
              aria-invalid={errors.password ? "true" : "false"} 
            />
            {errors.password && <p className="text-red-600" role="alert">{errors.password?.message}</p>}
          </div>
          
          <button type="submit" className="btn btn-success w-full mt-4">Register</button>
          {/* <p className="text-center text-sm mt-[6px]">Already have an account?<Link to='/login' className="text-secondary">Login</Link></p> */}
        </form>
    </div>
  )
}

export default Register