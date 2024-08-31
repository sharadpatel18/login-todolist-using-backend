import  Axios  from 'axios';
import React,{useEffect, useState} from 'react'

const Login = () => {
    const getId = () => {
        const id = localStorage.getItem('id') 
        if (id) {
            return JSON.parse(id)
        }else{
            ""
        }
    }
    const getToken = () => {
        const token = localStorage.getItem('token') 
        if (token) {
            return JSON.parse(token)
        }else{
            ""
        }
    }
    const getresData = () => {
        const resdata = localStorage.getItem('resData') 
        if (resdata) {
            return JSON.parse(resdata)
        }else{
            ""
        }
    }
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [token , setToken]=useState(getToken())
    const [userName , setuserName]=useState(getresData())
    const [id , setId] = useState(getId())
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:4000/auth/login" , {email,password})
        .then((res)=> {
            console.log(res.data)
            setToken(res.data.jwttoken)
            setuserName(res.data.name)
            setId(res.data.id)
            alert('login successfully')
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        localStorage.setItem('resData' , JSON.stringify(userName))
        localStorage.setItem('token' , JSON.stringify(token))
        localStorage.setItem('id' , JSON.stringify(id))
    },[token])
    return (
        <>
            <div className='main'>
                <div className="container">
                    <form className='form-signup' onSubmit={handleSubmit}>
                        <h3>Login</h3>
                        <hr />
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
        </>
    )
}

export default Login