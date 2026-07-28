import React from 'react'
import { Fugaz_One } from 'next/font/google'

const fugaz = Fugaz_One({
   variable: "--font-fugaz",
  subsets: ["latin"],
  weight: ["400"]

})




export default function Button(props) {
    const { text,dark,full,clickHandler } = props
    
  return (
    <div>
        <button onClick={clickHandler} className={`rounded-full px-4 sm:8 md:12 py-2 sm:3 min-w-30 hover:opacity-80 cursor-pointer border-indigo-600 border-2 border-solid ${dark ? ' text-white bg-indigo-600 ' : ' text-indigo-600 '} ${full ? ' grid place-items-center w-full ' : ' '}`}>
            <p className={`whitespace-nowrap ${fugaz.className}`}>{text}</p>
        </button>
    </div>
  )
}
