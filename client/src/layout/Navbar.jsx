import {Settings , User , LogOut, CopyPlus} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
        <div className="flex justify-between items-center p-2 mt-2 ">
            <ul className="flex gap-2 px-3">
                <Link to="/home" className="flex items-center gap-1 justify-center border-b-2 border-b-transparent hover:border-black transition-all py-2">Home</Link>
                <Link to="/explore" className="flex items-center gap-1 justify-center border-b-2 border-b-transparent hover:border-black transition-all py-2">explore</Link>
            </ul>
            <ul className="flex gap-4 px-3">
                <Link to="/newPost" className="flex items-center gap-1 justify-center border-b-2 border-b-transparent hover:border-black transition-all py-2"><CopyPlus/>New Post</Link>
                <Link to="/setting" className="flex items-center gap-1 justify-center border-b-2 border-b-transparent hover:border-black transition-all py-2"><Settings/></Link>
                <Link to="/profile" className="flex items-center gap-1 justify-center border-b-2 border-b-transparent hover:border-black transition-all py-2"><User/></Link>
                <Link to="/logout" className="flex items-center gap-1 justify-center border-b-2 border-b-transparent hover:border-black transition-all py-2"><LogOut/></Link>
            </ul>
        </div>
        </>
    )
}
export default Navbar;