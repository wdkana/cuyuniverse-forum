import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function CreatePosts(props) {
  const [description, setDescription] = useState("")
  const [limiter, setLimiter] = useState(200)
  const [isValid, setIsValid] = useState(true)

  const handleSubmit = () => {
    return isValid && Inertia.post('/dashboard/posts', { description })
  }

  const handleChange = (e) => {
    setDescription(e.target.value);
    const x = 200 - Number(e.target.value.length)
    if (x >= 0) {
      setLimiter(x)
    }
  }

  useEffect(() => {
    description.length >= 10 && description.length <= 200 ? setIsValid(true) : setIsValid(false)
  }, [description])

  const formValidateNotif = () => {
    return (
      <div className="alert alert-sm shadow-lg w-full lg:w-1/2 bg-base-300">
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
          <Link href={route(`${props.nextRoute}`)} as="button" className="btn btn-sm btn-link leading-tight">{props.next}</Link>
        </div>
      }
    >
      <Head title="Dashboard" />
      <div className='flex flex-col justify-center items-center p-4 gap-4'>
        {formValidateNotif()}
        <div className='w-full lg:w-1/2'>
          <textarea minLength={10} maxLength={200} required className="textarea bg-base-300 w-full" placeholder="Isi berita [min:10]" onChange={(description) => handleChange(description)}></textarea>
        </div>
        <button disabled={!isValid} className="btn lg:w-96 w-full" onClick={() => handleSubmit()}>Submit</button>
      </div >
    </Authenticated>
  )
}