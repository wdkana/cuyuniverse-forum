import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const CreatePost = ({ props }) => {
  const [description, setDescription] = useState('');
  const [limiter, setLimiter] = useState(200)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    let mount = true
    if (limiter > 0) {
      const isEmptySpace = /^\s*$/.test(description);
      mount && (description.length >= 10) && (description.length <= 200) && !isEmptySpace ? setIsValid(true) : setIsValid(false)
    }
    return () => { mount = false }
  }, [description.length])

  const handleChangePostDescription = (e) => {
    setDescription(e.target.value);
    const x = 200 - Number(e.target.value.length)
    if (x >= 0) {
      setLimiter(x)
    }
  }

  const handlePostSubmit = () => {
    const data = {
      description: description,
      token: props.auth.user.token
    }
    return isValid && Inertia.post('/dashboard/manage-posts/posts', data)
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
      <div className='flex flex-col justify-center items-center p-4 gap-4'>
        <div className="alert alert-sm rounded-md shadow-lg w-full lg:w-1/2 bg-primary">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6 "><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{!limiter ? "Ngetiknya udah dulu ya, simpen buat postingan berikutnya 👍" : `Saat ini postingan kamu dibatasi ${limiter} karakter`}</span>
          </div>
        </div>
        <div className='w-full lg:w-1/2'>
          <textarea minLength={10} maxLength={200} required className="textarea h-36 rounded-md w-full bg-slate-200 mt-3 dark:bg-slate-900 dark:text-white dark:placeholder-slate-100" placeholder="Isi posting [min:10]" onChange={(description) => handleChangePostDescription(description)}></textarea>
        </div>
        <button disabled={!isValid} className="btn btn-primary rounded-md lg:w-1/2 w-full dark:text-white" onClick={() => handlePostSubmit()}>Submit</button>
      </div >
    </div>
  )
}

export default CreatePost