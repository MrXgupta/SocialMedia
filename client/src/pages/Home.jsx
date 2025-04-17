import { useSelector } from "react-redux"
import {useNavigate} from "react-router-dom";


const Home = () => {
    const user = useSelector(state => state.user)
    console.log("User", user)
    const navigate = useNavigate()
    return (
        <>
            <div className="flex justify-between p-4 items-center">
            <h1 className="text-3xl font-mono">Social Media Feed</h1>
                <div className="border flex flex-col py-2 px-4 rounded-2 bg-sky-200 rounded-2xl text-right" onClick={()=>navigate('/profile')}>
                    <h1>Hey, <span className="font-bold"> {user?.user?.username}</span>- {user?.user?.bio} </h1>
                    <p>Followers - {user?.user?.followers || 0}</p>
                </div>

            </div>
        </>
    )
}

export default Home