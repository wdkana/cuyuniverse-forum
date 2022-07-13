import { formatDistance, } from 'date-fns'
import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export const formatTime = (time) => {
  const dateObject = formatDistance(new Date(time), new Date())
  const response = `${dateObject} ago`
  return response;
}

export const randomBadgeColor = () => {
  const color = ['badge-primary', 'badge-inline']
  const badgeColor = color[~~(Math.random() * color.length)];
  return badgeColor.toString()
}

export const protection = () => {
  const recaptchaRef = React.createRef();

  return (
    <form onSubmit={() => { recaptchaRef.current.execute(); }}>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey="6LehcesgAAAAAMgcGp0F9Gi3IcGqpNucA5TZjAee"
      />
    </form>
  )
}
