import React, {useState, useContext} from 'react'
import { Context } from "../store/appContext";


const LoginForm = () => {
    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(true);
    
    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if (success === false) setSuccess(true)
        let login = await actions.login(email, password)
        if (login === true) return actions.loginStatus()
        else setSuccess(false)
    }
  
    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type='email' value={email} onChange={(ev) => setEmail(ev.target.value)} />

            <label>Password:</label>
            <input type='password' value={password} onChange={(ev) => setPassword(ev.target.value)} />

            {success ? "" : <div className='alert alert-warning mt-1 p-1 text-center'>"Invalid credentials!"</div>}
            <button className="btn btn-primary mt-2">Login</button>
        </form>
    )
}

export default LoginForm