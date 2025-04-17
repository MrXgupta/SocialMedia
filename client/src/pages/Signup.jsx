import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Signup = () => {
    const [form , setForm] = useState({username: "",email: "", password: ""})
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        console.log("Signup Attempting")
        e.preventDefault();
        setForm({username: "",email: "", password: ""})
        const res = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        if(res.status === 200){
            alert("Sign up successfully")
            navigate('/')
        }else {
            alert(data.message)
        }
        console.log(data)
    }

    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col w-[50%] ml-[25%] border-2 border-black p-4 items-left text-left justify-center gap-2 mt-40 rounded-2xl">
                <h1 className="text-2xl font-bold text-black">
                    New here? SignUp Now!
                </h1>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Enter username" className="border px-4 py-1 rounded-xl focus:outline-none"
                       onChange={e => setForm({...form, username:e.target.value})}
                />
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Enter Email" className="border px-4 py-1 rounded-xl focus:outline-none"
                       onChange={e => setForm({...form, email:e.target.value})}
                />
                <label htmlFor="password">Password</label>
                <input type="password" name="" id="" placeholder="Enter password" className="border px-4 py-1 rounded-xl focus:outline-none"
                       onChange={e => setForm({...form, password:e.target.value})}/>
                <div className="flex gap-2 items-center">
                    <input type="checkbox" name="" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <input type="submit" value="LogIn" className="border bg-gray-200 p-2 rounded-2xl hover:font-bold"/>
                <p>Already have an Account? <Link to="/" className="underline">Login Now</Link></p>
            </form>
        </>
    )
}

export default Signup