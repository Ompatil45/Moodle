import { Fugaz_One, Open_Sans } from 'next/font/google'
import React from 'react'
import Button from './Button';
import Calender from './Calender';
import Link from 'next/link';
const opensans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  
});

const fugaz = Fugaz_One({
   variable: "--font-fugaz",
  subsets: ["latin"],
  weight: ["400"]

})

export default function Hero() {
  return (
    <div className='py-10 sm:py-15 md:py-20 flex flex-col gap-6'>
     <h1 className={`text-center text-5xl sm:6xl md:7xl ${fugaz.className}`}><span className= {`textGradient ${fugaz.className}`}>Moodle </span>Tracks your <span className= {`textGradient ${fugaz.className}`}>daily </span>mood
     </h1>
     <p className="text-center text-lg sm:text-xl md:text-2xl max-w-[600px] mx-auto ">create your own mood record and see how you feel on 
       <span className="font-semibold"> every day of every year</span>
     </p>
     <div className='mx-auto max-w-300 whitespace-overlap grid grid-cols-2 gap-2'>
      <Link href={'/dashboard'}>
             <Button text = 'Sign up' />
      </Link>
      <Link href={'/dashboard'}>
             <Button text = 'Login' dark />
      </Link>
      
     </div>
     <Calender demo />
     
    </div>
  )
}
