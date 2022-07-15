import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Setting(props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<div className='flex flex-row justify-between'>
        <h2 className="font-semibold text-xl leading-tight cursor-default">{props.page}</h2>
        <Link href={route(`${props.nextRoute}`)} as="button" className="btn btn-sm btn-link leading-tight">{props.next}</Link>
      </div>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h1>SETTING [SOON]</h1>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
