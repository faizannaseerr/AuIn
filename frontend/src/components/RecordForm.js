import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';

const RecordForm = (props) => {
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const summary = props.summary
    const transcript = props.transcription
    const link = props.link
    const navigate = useNavigate()

    const titleChange = (e) => {
        setTitle(e.target.value);
    };

    const categoriesChange = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            categories.push(e.target.value);
            setCategories([...categories]);
            e.target.value = "";
            console.log("category added: ", categories);
        }
    };

    const handleClick = async () => {
        const recording = { filename: title, link, transcript, summary, categories };
        const response = await fetch("/create", {
            method: "POST",
            body: JSON.stringify(recording),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (!response.ok) {
            console.log(json.error);
        }
        if (response.ok) {
            // dispatch({ type: "CREATE_BLOG", payload: json });
            console.log("okay")
            navigate("/recordings");
        }
    };

    return (
        <div className='border-4 border-[#000003] px-8 py-12 border-double shadow-md shadow-zinc-300 rounded-sm'>
            <form className='flex flex-col max-w-[50rem]'>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-source font-medium mb-6">{summary}</motion.div>
                <label className='font-medium mb-2'>Name</label>
                <input onChange={titleChange} className='border-2 border-gray-400 rounded-sm focus:outline-gray-600 focus:rounded-sm active:outline-none py-1 px-2 mb-4'></input>
                <label className='font-medium mb-2'>Categories</label>
                <input onKeyDown={categoriesChange} className='border-2 border-gray-400 rounded-sm focus:outline-gray-600 active:outline-none py-1 px-2 mb-10'></input>
                <div onClick={handleClick} className='cursor-pointer border-4 border-gray-400 border-double px-8 py-2 max-w-fit hover:border-black transition-all rounded-sm font-medium'>Save</div>
            </form>
        </div>
    )
}

export default RecordForm