import React from 'react'
import RecordForm from "../components/RecordForm"
import { useLocation } from 'react-router-dom'
import { motion } from "framer-motion"

const Create = () => {
    const location = useLocation()
    const { response, link, transcription } = location.state

    return (
        <div className='h-full w-full px-20 py-8'>
            <div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-5xl font-semibold font-source text-black font-merr">
                    Click the save button once you're ready!
                </motion.div>
                <div className="text-xl mt-20 flex items-center justify-center">
                    {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-source">{response}</motion.div> */}
                    {/* <div className="font-souce">{response.choices[0].message.content}</div> */}
                    <RecordForm summary={response} link={link} transcription={transcription} />
                </div>

            </div>
        </div>
    )
}

export default Create
