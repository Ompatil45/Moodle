'use client'  //client side component
import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, { useContext,useState,useEffect } from "react"

//initialize context
const AuthContext = React.createContext()

export function useAuth(){  //useAuth is a react hook
    return useContext(AuthContext)//the function useAuth will allow to access the global data in any component
}

export function AuthProvider( {children} ){ //children wraps the entire application
    const[currentUser,setCurrentUser] = useState(null)
    const[userDataObj,setUserDataObj] = useState(null)
    const[loading,setLoading] = useState(true)

    //AUTH HANDLERS
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)

    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        setCurrentUser(null)
        setUserDataObj(null)
        return signOut(auth)
    } //we can make many such functions like for forgot password,etc.

    useEffect(() => { //useEffect basically attracts events or add EventListeners
      //useEffect will go to firebase and access the user data and it will allow to use and update the user data anywhere in the global contsext
      const unsubscribe = onAuthStateChanged(auth, async user => {
        try{
            //set the user to local context state
        setLoading(true)
        setCurrentUser(user)
        if(!user){
            return //just return if no user found
        }
        //if the user exists,access the firestore database
        console.log('fetching user data')
        const docRef = doc(db,'users',user.uid)//this is the reference to the document containing the users path and the collection
        const docSnap = await getDoc(docRef) //this collects the user information from the document
        let firebaseData = {}
        if(docSnap.exists()){
            console.log('Found user data')
            firebaseData = docSnap.data()
            

        }//now we have created the system such that whenever a user logs in,we fetch its data
        setUserDataObj(firebaseData)//this sets it to context state,so that we can access it anywhere inside the application
        

      } catch(err){
        console.log(err.message)

      } finally {
        setLoading(false)
      }

      })//onAuthStateChanged is a firebase action,this will create a listener that listens authentication state changes
      return unsubscribe//this cleans up the application
        
    },[]) //empty [] means,it runs the code only when the app is mounted means ready to go
const value = {
    currentUser,
    userDataObj,
    setUserDataObj,
    signup,
    login,
    logout,
    loading,

}
return (
    <AuthContext.Provider value={value}>
        {children}

    </AuthContext.Provider>
)
}