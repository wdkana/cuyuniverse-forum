import { useState } from "react"

const NotificationAlert = ({ message }) => {
  const [show, setShow] = useState(true)

  setTimeout(() => {
    setShow(false)
  }, 4000)

  return show &&
    <div className="toast toast-center">
      <div className="alert bg-primary text-black">
        <span className="text-sm">{message}</span>
      </div>
    </div>
}

export default NotificationAlert