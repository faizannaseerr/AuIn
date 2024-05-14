import React from 'react'
import { motion } from "framer-motion"

const Categories = () => {
  return (
    <div className='py-8 px-20'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-5xl font-semibold font-source text-black font-merr">
        Categories
      </motion.div>
    </div>

  )
}

export default Categories