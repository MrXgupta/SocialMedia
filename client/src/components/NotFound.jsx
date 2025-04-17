import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="border-2 border-black bg-red-500 text-white flex flex-col p-4 justify-center items-center rounded-2xl mt-10 ml-[25%] w-[50%]">
                <h1 className="font-bold font-mono">
                This page doesn't exist! Fuck You,
                </h1>
                <Link to="/home" className="p-2 border-2 bg-green-600 font-bold rounded-xl m-2 " title="Click me"> Get Lost </Link>
            </div>
        </>
    )
}
export default NotFound;