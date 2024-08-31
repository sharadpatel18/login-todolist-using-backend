import React, { useState } from 'react'
import Axios from 'axios'
const Signup = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:4000/auth/signup" , {name,email,password})
        .then((res)=>{
            console.log(res)
            alert('signup successfully')
        })
        .catch((error)=>{
            console.log(error);
            alert("check input")
        })
    }
    return (
        <div className='main'>
            <div className='container'>
                <form className='form-signup' onSubmit={handleSubmit}>
                    <h3>signup</h3>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Name</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
