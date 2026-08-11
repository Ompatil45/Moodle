'use client'
import React, { useEffect, useState } from 'react'
import { Fugaz_One } from 'next/font/google'
import Calender from './Calender'
import { useAuth } from '@/Context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Login from './Login'
import Loading from './Loading'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'



const fugaz = Fugaz_One({
   variable: "--font-fugaz",
  subsets: ["latin"],
  weight: ["400"]

})

export default function Dashboard() {
  const { currentUser,userDataObj,setUserDataObj,loading } = useAuth()
  const [data,setData] = useState({})
  const now = new Date()
   //to count the values of statuses object
   function countValues(){
    let total_number_of_days = 0
    let sum_moods = 0
    for (let year in data){
      for(let month in data[year]){
        for(let day in data[year][month]){
          total_number_of_days++;
          sum_moods += data[year][month][day];
        }
      }
    }
    return{num_days:total_number_of_days , Average_Mood:total_number_of_days ? (sum_moods / total_number_of_days).toFixed(1) : 0}

   }
    const statuses = {
    ...countValues(),
    time_remaining: `${23-now.getHours()}H ${60-now.getMinutes()}M`,
    
  }

   
   async function handleSetMood(mood){
    
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    
    try{
    const newData = {...userDataObj};
    //optional chaining is used in nested properties,so that the app doesnt crash if an error occurs
    if(!newData?.[year]){ //this is optional chaining syntax,it will return undefined if true
         newData[year] = {}
    }
    if(!newData?.[year]?.[month]){
         newData[year][month] = {}
    }
    //the above both if statements are for,we should not be able to read the day directly,if year and month does not exist

    newData[year][month][day] = mood
    
    //update the current state
    setData(newData)//only this component can use and modify it(current state)
    //update the global state
    setUserDataObj(newData)//multiple components can use and modify it(global state)
    //update firebase //we used async await for updating firebase
    const docRef = doc(db, 'users', currentUser.uid)
    const res = await setDoc(docRef,{
      [year]: {
        [month]: {
          [day]: mood
        }
      }
    },{ merge: true })//this will keep the data in res from overwriting,this will merge firebase data and current data
   } catch(err){
      console.log('Failed to set data:', err.message )

    }
   }
 

  const moods = {
    Angry: '🤬',
    Happy: '😊',
    Sad: '😔',
    Excited: '😃',
    Nothing: '😑'


  }
  //this prevents data from being wiped to null prematurely
  useEffect(() => {
    if(!currentUser || !userDataObj){ //whenever these value changes from null to anything,this coldeblock runs
      return
      //this code is necessary because it protects the data below
    }
    setData(userDataObj)

  },[currentUser,userDataObj])

    //render logic:this prevents the dashboard from rendering at all until loading is done and a user exists
      if(loading){                   //this if and the below if are guard code,it alrady did,what the children was doing,so no need of children
        return <Loading></Loading>
      }
      if(!currentUser){
        return <Login></Login>
      }
  return (
    <div>
    
    <div className='flex flex-col flex-1 gap-4 sm:gap-8 md:gap-12'>
      <div className='grid grid-cols-3 sm:grid-cols-3 bg-indigo-50 rounded-lg text-indigo-600 text-center mt-[10px] ml-4 mr-4 sm:ml-7 sm:mr-7'>
        {Object.keys(statuses).map((status,statusIndex) => {
          return(
            <div key={statusIndex} className='p-4 flex flex-col gap-1'>
              <p className='text-xs sm:text-md md:text-xl capitalize'>{status.replaceAll('_',' ')}</p>
              <p className={`${fugaz.className}`}>{statuses[status]}</p>

            </div>
            
          )
        })}

      </div>
      <div className='text-center m-8'>
      <p className='text-5xl sm:text-6xl md:7xl'>How are you <span className={`text-indigo-600 ${fugaz.className}`}>feeling</span> today!</p>
      </div>
      <div className='flex items-stretch flex-wrap text-center gap-4 text-xl md:3xl ml-4 mr-4 sm:ml-8 sm:mr-8 md:w-[95%'>
        {Object.keys(moods).map((mood,moodIndex) => {
          return(
          <button onClick={() => {
            const currentMoodValue = moodIndex + 1 //as the base rating is from 1 to 5,so we have to start from 1 i.e. moodindex + 1
            handleSetMood(currentMoodValue)
          }} key={moodIndex} className={`flex flex-col gap-1 flex-1  mx-auto w-fit p-5 md:p-4 cursor-pointer border border-solid bg-indigo-50 rounded-lg border-[0px] lavender`}>
            <p className='text-4xl sm:5xl md:6xl'>{moods[mood]}</p>
            <p className={`text-indigo-500 text-sm sm:text-md md:text-lg ${fugaz.className}`}>{mood}</p>
          </button>
        )
        })}
      </div>
      <Calender completeData={data} handleSetMood={handleSetMood}/>
    </div>
    </div>
  )
}
