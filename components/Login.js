'use client'
import React from 'react'
import { useState } from 'react'
import { Fugaz_One } from 'next/font/google'
import Button from './Button'
import { useAuth } from '@/Context/AuthContext'
//import { useRouter } from 'next/navigation'

const fugaz = Fugaz_One({
   variable: "--font-fugaz",
  subsets: ["latin"],
  weight: ["400"]

})

export default function Login() {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[isRegister,setIsRegister] = useState(false)
  const[authenticating,setAuthenticating] = useState(false)
  const { signup,login } = useAuth()
  //const router = useRouter()

  async function HandleSubmit() {
    if(!email || !password || password.length<6){
      return
    }
     setAuthenticating(true)
    try{
      if(isRegister){
        console.log('Signing up a new user')
        await signup(email,password) //we use await on these because this fetches info from backend,so it does asynchronous work
      } else{
        console.log('Logging in a registered user')
        await login(email,password)
      }
      //router.push('/dashboard')

    } catch(err){
      console.log(err.message)

    } finally{
      setAuthenticating(false)

    }
    
    
  }

  return (
    <div className='flex-1 flex flex-col justify-center items-center gap-4'>
      <h3 className={`text-4xl sm:text-5xl md:6xl ${fugaz.className}`}>{isRegister ? 'Register' : 'Login'}</h3>
      <p>You&#39;re one step away!</p>
      <div className='flex flex-col gap-3 max-w-[320px] w-full mx-auto sm:max-w-[400px]'>
        <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' type='text' className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none'/>
        <input value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' type='password' className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none'/>
      </div>
        
        <div className='max-w-[320px] w-full mx-auto sm:max-w-[400px]'>
          <Button clickHandler={HandleSubmit} text ={authenticating ? 'Submitting' : 'Submit'} full />
        </div>
        <p>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}
          <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600 cursor-pointer' >{isRegister ? 'Sign in' : 'Sign up'}</button>
        </p>
        
      </div>
     
    
  )
}
