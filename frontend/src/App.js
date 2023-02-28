import {useState, useEffect} from 'react'
import axios from 'axios'


function App() {

  const [users,setUsers] = useState([])
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const[isUpdating,setIsUpdating] = useState(false)
  const [updateId,setUpdateId] = useState("")

  const update = (updateId,username,password) => {
    axios.post("http://localhost:5000/update",{_id:updateId,username:username,password:password})
    .then((data => {
      console.log(data)
      setIsUpdating(false)
      getUsers()
    }))
  }

  const getUsers = () => {
     axios.get('http://localhost:5000/users')
    .then(res => {
      setUsers(res.data)
      setPassword("")
      setUsername("")
    })
  }

  function createUser() {

    axios.post("http://localhost:5000/save",{username:username,password:password})
    .then((res) => {
      getUsers()
      console.log("Created Successfully...")
      
    })

  }

  useEffect(() => {
    getUsers()
   
  },[])
 

  return (
    <div className="App">
      {users.map((user) => (
        <div key={user._id}>
          <h1>{user.username}</h1>
          <h1>{user.password}</h1>    
          <button onClick={() => {
            setIsUpdating(true) 
            setUpdateId(user._id)}}>UPDATE</button>
        </div> 
      ))} 
          <input type="text" placeholder="username..." onChange={(e) => setUsername(e.target.value) }/>
          <input type="text" placeholder="password..." onChange={(e) => setPassword(e.target.value) }/>
          <button onClick={ isUpdating ? ()=> update(updateId,username,password) : () => createUser()}>{ isUpdating ? "Update" : "Add"}</button>
    </div>
  );
}

export default App;
