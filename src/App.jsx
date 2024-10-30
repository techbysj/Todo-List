import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import profilePic from './123.jpg'
import React from 'react'
import Todo from './todo'
import { Todo2 } from './Todo2'

function Description({description}){
  return(
    <section className='flex-center'>
      <p>
        {description}
      </p>
      <button onClick={()=> {console.log('Clicked')}}>Click Me!</button>
    </section>  
  );
}


function App() {
  const [count, setCount] = useState(0)

  let description = `Hi,👋🏻 I'M Salim Jamal. I am a web developer with experience in developing scalable Web Apps.
   I am a using Html, Css and Javascript with React Framework.`;


  //JSX -Javascript and Html -- It allows you to use HTML in js

  return (
    <>
    <Description description={description} designation='Managerial'/>
    <Description description='My name is Bill Gates' founded='Microsoft'/>
    <Photo imageURL={profilePic} className='rounded'/>
    {/* <Todo ></Todo> */}
    <Todo2 />
    </>
  )
 }

function Photo({ imageURL, className}){
  return(
    <section>
     <img className={className} src={imageURL} alt="Profile photo" width="100" height="200"></img>
    </section>
  );
}

export default App
