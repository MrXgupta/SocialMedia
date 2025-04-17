import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout, setUser} from "../features/auth.js";


const Login = () => {
    const [form , setForm] = useState({username: "", password: ""})
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // dispatch(logout());

    const onSubmit = async (e) => {
        e.preventDefault();
        setForm({username: "", password: ""})
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        if(res.status === 200){
            console.log(data)
            dispatch(setUser(data.user))
            alert("Login successfully")
            navigate("/home")
        }
        console.log(data)
    }

    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col w-[50%] ml-[25%] border-2 border-black p-4 items-left text-left justify-center gap-2 mt-40 rounded-2xl">
                <h1 className="text-2xl font-bold text-black">
            Welcome Back! Login here
                </h1>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Enter username" className="border px-4 py-1 rounded-xl focus:outline-none"
                onChange={e => setForm({...form, username:e.target.value})}
                />
                <label htmlFor="password">Password</label>
                <input type="password" name="" id="" placeholder="Enter password" className="border px-4 py-1 rounded-xl focus:outline-none"
                onChange={e => setForm({...form, password:e.target.value})}/>
                <div className="flex gap-2 items-center">
                    <input type="checkbox" name="" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <input type="submit" value="LogIn" className="border bg-gray-200 p-2 rounded-2xl hover:font-bold"/>
                <p>New Here? <Link to="/Signup" className="underline p-2">Signup Now</Link> </p>
            </form>
        </>
    )
}

export default Login