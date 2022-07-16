import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Homepage/Navbar';
import Content from '@/Components/Mading/Content.Mading';
import Intro from '@/Components/Mading/Intro.Mading';

export default function MadingPage(props) {
  return (
    <>
      <Head title={props.title} />
      <div className='min-h-screen'>
        <Navbar user={props.auth.user} title="Cuy Universe" />
        <Intro />
        <Content />
      </div>
    </>
  )
}