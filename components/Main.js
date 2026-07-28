import React from 'react'

export default function Main(props) {
    const { children } = props
  return (
    <div className='flex-1'>
        {children}
    </div>
  )
}
