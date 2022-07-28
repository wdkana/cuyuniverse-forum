const nothing = () => {
  return ""
}

const isNotif = (message) => {
  if (message) {
    return <div className="toast toast-top toast-center z-10" >
      <div className="alert bg-primary text-primary-content dark:text-dark">
        <span className="text-sm">{message}</span>
      </div>
    </div>
  } else {
    return nothing()
  }
}

const NotificationAlert = ({ message }) => {
  return isNotif(message);
}

export default NotificationAlert
