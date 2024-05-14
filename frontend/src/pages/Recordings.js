import React from 'react'
import { motion } from "framer-motion"

const Recordings = () => {
  return (
    <div className='h-full w-full px-20 py-8'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-5xl font-semibold font-source text-black font-merr">
        Recordings
      </motion.div>

    </div>

  )
}

export default Recordings