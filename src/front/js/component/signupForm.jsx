import React, {useState, useContext} from 'react'
import { Context } from "../store/appContext";


const SignupForm = () => {
    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(true);
    
    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if (success === false) setSuccess(true)
        let signup = await actions.signup(email, username, password)
        if (signup === true) {
            let login = await actions.login(email, password)
            if (login === true) return actions.loginStatus()
            else setSuccess(false)
        } else setSuccess(false)
    }
  
    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type='email' value={email} onChange={(ev) => setEmail(ev.target.value)} />

            <label>Username:</label>
            <input type='text' value={username} onChange={(ev) => setUsername(ev.target.value)} />

            <label>Password:</label>
            <input type='password' value={password} onChange={(ev) => setPassword(ev.target.value)} />

            {success ? "" : <div className='alert alert-warning mt-1 p-1 text-center'>"Something went wrong!"</div>}
            <button className="btn btn-primary mt-2">Signup</button>
        </form>
    )
}

export default SignupForm