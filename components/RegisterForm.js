import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import { no_auth_required } from '../middlewares/no_auth_required'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
  no_auth_required()
  const { setToken,theme } = useAuth()
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confpass, setConfPass] = useState("")

  const registerFieldsAreValid = (
    firstName,
    lastName,
    email,
    username,
    password
  ) => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      username === '' ||
      password === ''
    ) {

      theme==='dark'? toast.warn("Please fill all fields correctly",{theme: 'dark'}) : toast.warn("Please fill all fields correctly")
      return false
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      theme==='dark'? toast.warn("Please enter a valid email address",{theme: 'dark'}) : toast.warn("Please enter a valid email address")
      return false
    }
    return true
  }

  const register = (e) => {
    e.preventDefault()

    if (
      registerFieldsAreValid(firstName, lastName, email, username, password)
    ) {
      if(confpass===password){
      theme==='dark'? toast.info("Please wait...",{theme: 'dark'}) : toast.info("Please wait...")
      const dataForApiRequest = {
        name: firstName + ' ' + lastName,
        email: email,
        username: username,
        password: password,
      }

      axios.post(
        'auth/register/',
        dataForApiRequest,
      )
        .then(function ({ data, status }) {
          setToken(data.token)
          router.reload()
          theme==='dark'? toast.info("Please wait...",{theme: 'dark'}) : toast.info("Please wait...")
        })
        .catch(function (err) {
          theme==='dark'? toast.error("Email or Username already exists",{theme: 'dark'}) : toast.error("Email or Username already exists")
        })
    }
    else{
      theme==='dark'? toast.error("Passwords dont match!!!",{theme: 'dark'}) : toast.error("Passwords dont match!!!")
    }
  }
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='dark:bg-green-800 bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Register</h1>
          <input
            type='text'
            className='block border dark:text-white border-grey-light w-full p-3 rounded mb-4'
            name='inputFirstName'
            id='inputFirstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />
          <input
            type='text'
            className='block border dark:text-white border-grey-light w-full p-3 rounded mb-4'
            name='inputLastName'
            id='inputLastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          />

          <input
            type='email'
            className='block border dark:text-white border-grey-light w-full p-3 rounded mb-4'
            name='inputEmail'
            id='inputEmail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
          />

          <input
            type='text'
            className='block border dark:text-white border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />

          <input
            type='password'
            className='block border dark:text-white border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
           <input
            type='password'
            className='block border border-grey-light dark:text-white w-full p-3 rounded mb-4'
            name='inputConfirmPassword'
            id='inputConfirmPassword'
            placeholder='Confirm Password'
            value={confpass}
            onChange={(e)=>{setConfPass(e.target.value)}}
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-transparent dark:bg-red-500 dark:text-white text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
            onClick={register}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
