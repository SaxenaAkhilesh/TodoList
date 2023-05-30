import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const AddTodoList = ({ addList, id ,setList}: any) => {
  // const [id, setId] = useState(null)
  // console.log(id);

  const [data, setdata] = useState({
    title: "", content: ""
  })

  const changeHandler = (e: any) => {
    var name = e.target.name;
    var value = e.target.value;
    setdata({ ...data, [name]: value })
  }


  const sumbitData = async (e: any) => {
    e.preventDefault();
    const { title, content } = data;
    if (!title || !content) {
      alert("plz all input")
    } else {
      const res = await fetch("/api/dataadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title, content, id
        })
      })
      const response=await res.json()
      setList(response.ResponseUpdate.list); 
    }
  }


  const getItemId = () => {
    // const id:any=window.localStorage.getItem("user_id")
    // setId(id)
  }

  const closeData = () => {
    addList()
  }


  useEffect(() => {
    getItemId()
  }, [])

  return (
    <div className="addTodo">
      <div className="mainAddTodo">
        <div className="cross" onClick={addList} ><AiOutlineClose /></div>
        <div className="head">Add Task</div>
        <form >
          <div className="point">
            <label >Enter Your Title</label>
            <input type="text" id='title' name='title' className='title' value={data.title} onChange={(e) => { changeHandler(e) }} />
          </div>
          <div className="point">
            <label >Enter Your Content</label>
            <textarea name="content" id="textarea" cols={30} rows={7} value={data.content} onChange={(e) => { changeHandler(e) }} />
          </div>
          <button onClick={(e) => { sumbitData(e) }}>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddTodoList