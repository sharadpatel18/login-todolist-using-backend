import Axios from 'axios'
import React from 'react'

const List = ({title,note , handleEdit , id , setUpdateUi}) => {

    const handleDelete =()=>{
        Axios.delete(`http://localhost:4000/todolist/${id}`)
        .then((res)=>{
            console.log(res);
            setUpdateUi((prevState)=>!prevState)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
          <li className='li'>
            <div>
                <label htmlFor="title">title: {title}</label>
            </div>
            <div>
                <label htmlFor="note">note: {note}</label>
            </div>
            <div>
                <button className='btn btn-success' onClick={()=>handleEdit(title,note , id)}>edit</button>
                <button className='btn btn-danger' onClick={handleDelete}>delete</button>
            </div>
        </li>
  )
}

export default List
