import { useState } from "react"

const NotificationAlert = ({ message }) => {
  const [show, setShow] = useState(true)

  setTimeout(() => {
    setShow(false)
  }, 4000)

  return show &&
    <div className="toast toast-top toast-center z-10">
      <div className="alert bg-primary text-black">
        <span className="text-sm">{message}</span>
      </div>
    </div>
}

export default NotificationAlert