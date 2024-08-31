import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import List from './List'

const Home = () => {
    const getName = () => {
        const username = localStorage.getItem('resData')
        if (username) {
            return JSON.parse(localStorage.getItem('resData'))
        } else {
            return ""
        }
    }
    const [userName, setUserName] = useState(getName());
    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")
    const [id, setId] = useState(JSON.parse(localStorage.getItem("id")))
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
    const [lists , setList] = useState([])
    const [isUpdated , setisUpdated] = useState(false)
    const [updateId , setUpdateid] = useState(null)
    const [updateUi , setUpdateUi] = useState(false)
    const handleSubmit = () => {
        Axios.post("http://localhost:4000/todolist", { title: title, note: note, user: id })
            .then((res) => {
                setUpdateUi((prevState)=>!prevState)
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(()=>{
        Axios.get("http://localhost:4000/api" , {
            headers:{
                "Authorization":`${token}`
            }
        })
        .then((res)=>{
            setList(res.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[updateUi])

    const handleEdit = (title,note , id) =>{
        setTitle(title);
        setNote(note);
        setisUpdated(true)
        setUpdateid(id)
    }
    const handleUpdate =() =>{
        Axios.put(`http://localhost:4000/todolist/${updateId}` , {title,note})
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div className='home-main'>
            <div className="home-container">
                <div className='input'>
                    <form className='form' onSubmit={(isUpdated) ? handleUpdate : handleSubmit}>
                        {(userName) ? <h1>hello {userName}</h1> : <h1>please login first</h1>}
                        <div className="title">
                            <label htmlFor="title">Title </label>
                            <input type="text" placeholder='enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="note">
                            <label htmlFor="note">Note </label>
                            <textarea name="note" placeholder='enter notes' value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                        </div>
                        <button className='btn btn-primary'>{(isUpdated) ? "update" : "submit"}</button>
                    </form>
                </div>
                <div className="output">
                    <ul>
                        {
                            lists.map((todo) => (
                                <List key={todo._id} id={todo._id} title={todo.title} note={todo.note} handleEdit={handleEdit}  setUpdateUi={setUpdateUi}/>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home
