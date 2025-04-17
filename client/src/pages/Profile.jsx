import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setUser} from "../features/auth.js";


const Profile = () => {
    const user = useSelector(state => state.user)
    console.log(user)
    const username = user.user.username
    const [userDetails, setUserDetails] = useState({
        name:"",
        email:"",
        phone:"",
        bio:"",
    })
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        const getUserDetails = async () => {
                const res = await fetch("http://localhost:5000/api/user/userdetails", {
                    method: "POST",
                        headers:
                    {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username})
                });
                const data = await res.json()
                setUserDetails(data)
        }
        getUserDetails()

    },[])

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in userDetails) {
            formData.append(key, userDetails[key]);
        }

        if (selectedImage) {
            formData.append("image", selectedImage);
        }
        console.log(formData)

        const res = await fetch("http://localhost:5000/api/user/updateUser", {
            method: "PATCH",
            body: formData,
        });

        const data = await res.json();
        if (res.status === 200) {
            alert(data.message);
            dispatch(setUser(data.user));
            window.location.reload();
        }
    }



    return (
        <>
            <div className="w-[90%] ml-[5%] border-2 p-4 rounded-2xl">
            <h1 className="text-xl text-center capitalize font-medium mb-2">Update Your Profile, {user?.user?.username}!</h1>

                <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setSelectedImage(file);
                    }}
                />
                <div onClick={() => document.getElementById("fileInput").click()} className="cursor-pointer flex justify-center flex-col items-center">
                    <img
                        src={`/assets/${userDetails?.username}/pfp.jpg`}
                        alt="Profile Image"
                        onError={(e) => {
                            e.target.onerror = null; // prevents looping
                            e.target.src = "https://storage.sonusvos.com/v2/default/assets/default-pfp-3.jpg";
                        }}
                        className="border-2 w-[15%] rounded-[50%] bg-gray-300 text-center"
                    />

                    <p className="underline">Edit</p>
                </div>


                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                    <label htmlFor="">Name</label>
                    <input type="text" value={userDetails.name} className="border-b-2 border-black focus:outline-0" placeholder="Enter your Name"
                           onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="">Username</label>
                    <input type="text" value={userDetails.username} className="border-b-2 border-black focus:outline-0" placeholder="Enter your Username"
                           onChange={(e) => setUserDetails(prev => ({ ...prev, username: e.target.value }))}
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="">Bio</label>
                    <input type="text" value={userDetails.bio} className="border-b-2 border-black focus:outline-0" placeholder="Enter your Bio"
                           onChange={(e) => setUserDetails(prev => ({ ...prev, bio: e.target.value }))}
                    />
                    </div>
                    <div className="flex flex-col gap-2 cursor-not-allowed">
                    <label htmlFor="">Email</label>
                    <input type="text" value={userDetails.email} className="border-b-2 border-black focus:outline-0 cursor-not-allowed" readOnly/>
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="">Phone No.</label>
                    <input type="text" value={userDetails.phone} className="border-b-2 border-black focus:outline-0" placeholder="Enter your Phone Number"
                           onChange={(e) => setUserDetails(prev => ({ ...prev, phone: e.target.value }))}
                    />
                    </div>
                    <input type="submit" value="Update Profile" className="bg-green-300 p-2 w-3/12 rounded-lg hover:bg-green-400 transition-all"/>
                </form>
            </div>
        </>
    )

}

export default Profile