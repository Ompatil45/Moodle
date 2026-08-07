'use client'
import { useAuth } from '@/Context/AuthContext'
import Link from 'next/link'
import React from 'react'
import Button from './Button'

export default function CalltoAction() {
    const {currentUser} = useAuth()
    if(currentUser){
        return(
            <div className='mx-auto max-w-[600px] w-full'>
            <Link href={'/dashboard'}>
                 <Button dark full text = 'Go to Dashboard' />
          </Link>
          </div>
        )
    }
  return (
    <div className='mx-auto max-w-300 whitespace-overlap grid grid-cols-2 gap-2'>
          <Link href={'/dashboard'}>
                 <Button text = 'Sign up' />
          </Link>
          <Link href={'/dashboard'}>
                 <Button text = 'Login' dark />
          </Link>
          
         </div>
  )
}
