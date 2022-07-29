import React from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import IntegrationCLI from '@/Components/Dashboard/IntegrationCLI';

export default function Integration(props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl leading-tight cursor-default">{props.title}</h2>
          <Link href={route(`${props.nextRoute}`)} as="button" className="btn btn-sm btn-ghost rounded-md leading-tight">
            {props.next}
          </Link>
        </div>
      }
    >
      <Head title={props.title} />
      <div className='min-h-screen dark:text-white'>
        <div className='text-center pt-6'>
          <h1 className='font-bold text-lg'>✨ {props.title} ✨</h1>
        </div>
        <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech py-6 px-4 gap-6'>
          <IntegrationCLI token={props.auth.user.token} props={props} secret={props.auth.user.secret} cli={props.auth.user.cuycli} />
        </div>
      </div>
    </Authenticated>
  )
}