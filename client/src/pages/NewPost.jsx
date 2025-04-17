import { useSelector } from "react-redux";
import { useState } from "react";

const NewPost = () => {
    const user = useSelector((state) => state.user.user);
    const [post, setPost] = useState({});
    const [images, setImages] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("description", post.description);
        formData.append("username", user.username);
        formData.append("hashtags", post.hashtags); // stringified in backend
        formData.append("mentions", post.mentions); // stringified in backend

        images.forEach((image) => {
            formData.append("images", image);
        });

        const res = await fetch("http://localhost:5000/api/post/create", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.status === 200) alert("Post created successfully!");
        else alert("Failed to create post.");
    };

    return (
        <div>
            <h1 className="p-2">New Post</h1>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="flex flex-col gap-2 p-2">
                    <label>Title</label>
                    <input
                        type="text"
                        className="border-b-2 border-black focus:outline-0 px-4 py-1"
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2 p-2">
                    <label>Description</label>
                    <input
                        type="text"
                        className="border-b-2 border-black focus:outline-0 px-4 py-1"
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2 p-2">
                    <label>Hashtags (comma-separated)</label>
                    <input
                        type="text"
                        placeholder="e.g., tech,code,mern"
                        className="border-b-2 border-black focus:outline-0 px-4 py-1"
                        onChange={(e) => setPost({ ...post, hashtags: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2 p-2">
                    <label>Mentions (comma-separated usernames)</label>
                    <input
                        type="text"
                        placeholder="e.g., john,jane"
                        className="border-b-2 border-black focus:outline-0 px-4 py-1"
                        onChange={(e) => setPost({ ...post, mentions: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2 p-2">
                    <label>Upload Images (max 4)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="border-b-2 border-black focus:outline-0 px-4 py-1"
                        onChange={(e) => {
                            const selected = Array.from(e.target.files).slice(0, 4); // Max 4
                            setImages(selected);
                        }}
                    />
                </div>

                <input
                    type="submit"
                    value="Post"
                    className="border py-2 px-4 m-2 font-medium bg-green-300 rounded-2xl"
                />
            </form>
        </div>
    );
};

export default NewPost;
