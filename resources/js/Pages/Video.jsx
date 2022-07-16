import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function VideoPage(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  let fileInput = React.createRef();

  console.log('props: ', props)

  const handleSubmit = () => {
    const video = fileInput.current.files[0]
    const data = {
      title, description, video
    }
    Inertia.post('/video', data)
  }
  return (
    <>
      <div>
        <p><input type="text" name="title" placeholder="Enter Video Title" onChange={(e) => setTitle(e.target.value)} /></p>
        <p><textarea name="description" cols="30" rows="10" placeholder="Video description" onChange={(e) => setDescription(e.target.value)}></textarea></p>
        <p><input type="file" name="video" ref={fileInput} /></p>
        <button type="submit" onClick={() => handleSubmit()}>Submit</button>
      </div>
    </>
  )
}