import react, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "./index.scss"
import AddTodoList from "./AddTodoList";

const Home = () => {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState()
  const [list, setList] = useState([])

  // add list 
  const addList = () => {
    setToggle(!toggle)
  }



  const userisValid = async () => {
    const res = await fetch("/api/userisvalid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const response = await res.json();
    console.log(response.username);

    if (!response.username) {
      navigate("/login")
    } else {
      navigate("/")
      setId(response._id);
      setList(response.list)
      window.localStorage.setItem("user_id", response._id)
    }
  }


  useEffect(() => {
    // eslint-disable-next-line
    userisValid();
  }, [])
  return (
    <>
      <div className="homePage">
        <div className="upperSection">
          <div className="container">
            <div className="title"> Task Sheet </div>
            <div className="button" onClick={() => { addList() }}>Add</div>
          </div>
        </div>
        <div className="bottomSection">
          <div className="containers">
            {react.Children.toArray(
              list.map((elem: any) => {
                return (
                  <div className="point">
                    <div className="point__title">{elem.title}</div>
                    <div className="point__content">{elem.content}</div>
                  </div>
                )
              })
            )

            }
          </div>
        </div>
      </div>
      {toggle ? <AddTodoList addList={addList} id={id} setList={setList} /> : ""}
    </>
  )
}

export default Home