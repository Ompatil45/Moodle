'use client'
import { gradients,baseRating } from '@/utils';
import React, { useState } from 'react'
import { Fugaz_One } from 'next/font/google';


const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
};
const monthArr = Object.keys(months)//we can access array of months
export const demoData = {
    "15": 2, "16": 4, "17": 1, "18": 3, "19": 5,
    "20": 2, "21": 4, "22": 1, "23": 3, "24": 5,
}
const now = new Date();
const dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const fugaz = Fugaz_One({
   variable: "--font-fugaz",
  subsets: ["latin"],
  weight: ["400"]

})




export default function Calender(props) {
  const { demo,completeData,handleSetMood } = props
  const now = new Date()
  const currmonth = now.getMonth()
  const [selectedMonth,setSelectedMonth] = useState(monthArr[currmonth])//this will create an array of keys of month,and will access the index of currmonth
  const [selectedYear,setSelectedYear] = useState(now.getFullYear())
  // const year = 2026
  // const month = 'june'
  const monthNow = new Date(selectedYear,monthArr.indexOf(selectedMonth),1)
  const firstDayofMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear,Object.keys(selectedMonth).indexOf(selectedMonth) + 1,0).getDate()
  const daystoDisplay = firstDayofMonth + daysInMonth
  const numRows = (Math.floor(daystoDisplay / 7)) + (daystoDisplay % 7 ? 1 : 0)
  //this will handle the data for the selected month when we click on a mood button
  //after the error,we realize that we need the index of selectedmonth
  const numericMonth = monthArr.indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericMonth] || {}//this is used in case we have nothing
  console.log('This Months Data:', completeData?.[selectedYear]?.[numericMonth])

  function handleIncrementDecrementMonth(val){
    //value +1 or -1
    //when we reach end of the months bound,we adjust the year
    if(numericMonth + val < 0){
      //set month value = 11 and decrement the year
      setSelectedYear(curr => curr - 1)
      setSelectedMonth(monthArr[monthArr.length - 1])

    } else if(numericMonth + val > 11){
      //set month value = 0 and increment the year
       setSelectedYear(curr => curr + 1)
       setSelectedMonth(monthArr[0])

    } else{
      setSelectedMonth(monthArr[numericMonth + val])
    }
  }

  
  

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-3 gap-4'>
        <button onClick={handleIncrementDecrementMonth(-1)} className='mr-auto text-indigo-500'><i className="fa-solid fa-circle-chevron-left"></i></button>
        <p className={`text-center capitalized textGradient ${fugaz.className}`}>{selectedMonth}</p>
        <button onClick={handleIncrementDecrementMonth(1)} className='ml-auto text-indigo-500'><i className ="fa-solid fa-circle-chevron-right"></i></button>
      </div>
    <div className='flex flex-col overflow-hidden  gap-1 py-4 sm:py-6 md:py-10'>
      {[...Array(numRows).keys()].map((row,rowIndex) => 
      {
        return(
          <div key={rowIndex} className='grid grid-cols-7 gap-1'>
            {dayList.map((dayofWeek,dayofWeekIndex) => {
             let dayIndex = (rowIndex * 7) + (dayofWeekIndex) - (firstDayofMonth - 1)
             let dayDisplay = dayIndex > daysInMonth ? 
             false : (row === 0 && dayofWeekIndex < firstDayofMonth) ? false : true 

             let isToday = dayIndex === now.getDate()

             if (!dayDisplay){
              return(
                <div className='bg-white' key={dayofWeekIndex}/>
              )
             }

             let color = demo ? gradients.indigo[baseRating[dayIndex]] : dayIndex in data ? gradients.indigo[data[dayIndex]] : 'white'
            
            
              return(
                 <div style={{background: color}} className={`text-xs sm:text-sm border border-solid p-2 flex item-center gap-2 justify-between rounded-lg ${ isToday ? 'border-indigo-400' : 'border-indigo-100'} ${ color === 'white' ? 'text-indigo-400' : 'text-white'}`} key={dayofWeekIndex}>
                           <p>{dayIndex}</p>
                 </div>
                
              )
            })}
          </div>
        )
      }
      )}

    </div>
    </div>
  )
}
