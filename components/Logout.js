'use client'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/Context/AuthContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


export default function Logout() {
    const { logout, currentUser } = useAuth()
    const pathName = usePathname()
    if(!currentUser){
        return null
    }
    if(pathName === '/'){
        return (
            <Link href={'/dashboard'} >
                <Button text = 'Go to Dashboard' ></Button>
            </Link>
        )
    }
    
  return (
    <Button text = "Logout" clickHandler = {logout} ></Button>
  )
}
