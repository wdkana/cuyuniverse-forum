import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
// import { set } from 'lodash';

export default function CreatePosts(props) {
  const [description, setDescription] = useState('');
  // const [image, setImage] = useState('');
  const [limiter, setLimiter] = useState(200)
  const [isValid, setIsValid] = useState(true)

  const handleSubmit = () => {
    const data = {
      description: description,
      // image: image,
      token: props.auth.user.token
    }
    return isValid && Inertia.post('/dashboard/manage-posts/posts', data)
  }

  // const imageHandler = (e) => {
  //   setImage(e.target.files[0])
  //   let filename = e.target.files[0].name;
  // }

  const handleChange = (e) => {
    setDescription(e.target.value);
    const x = 200 - Number(e.target.value.length)
    if (x >= 0) {
      setLimiter(x)
    }
  }


  useEffect(() => {
    let mount = true
    if (limiter > 0) {
      const isEmptySpace = /^\s*$/.test(description);
      mount && (description.length >= 10) && (description.length <= 200) && !isEmptySpace ? setIsValid(true) : setIsValid(false)
    }
    return () => { mount = false }
  }, [description.length])

  const formValidateNotif = () => {
    return (
      <div className="alert alert-sm rounded-md shadow-lg w-full lg:w-1/2 bg-primary">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{!limiter ? "Ngetiknya udah dulu ya, simpen buat postingan berikutnya 👍" : `Saat ini postingan kamu dibatasi ${limiter} karakter`}</span>
        </div>
      </div>
    )
  }

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className='flex flex-row justify-between'>
          <h2 className="font-semibold text-xl leading-tight cursor-default">{props.page}</h2>
          <Link href={route(`${props.nextRoute}`)} as="button" className="btn btn-sm btn-ghost leading-tight">{props.next}</Link>
        </div>
      }
    >
      <Head title="Dashboard" />
      <div className='flex flex-col justify-center items-center p-4 gap-4'>
        {formValidateNotif()}
        <div className='w-full lg:w-1/2'>
          {/* after fixing will deploy this post image upload */}
          {/* <label className="block text-sm font-medium leading-5 text-gray-700 mb-2">Error Image <span className='text-red-600'>*Max 1 mb</span></label>
          <input type="file" name="image"onChange={imageHandler} className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" /> */}

          <textarea minLength={10} maxLength={200} required className="textarea h-36 bg-base-200 rounded-md w-full mt-3" placeholder="Isi posting [min:10]" onChange={(description) => handleChange(description)}></textarea>
        </div>
        <button disabled={!isValid} className="btn btn-primary rounded-md lg:w-1/2 w-full" onClick={() => handleSubmit()}>Submit</button>
      </div >
    </Authenticated>

  )

}