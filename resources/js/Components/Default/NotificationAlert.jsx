const nothing = () => {
  return "";
};

const isNotif = (message) => {
  if (message) {
    return (
      <div className="toast toast-top toast-center z-10">
        <div className="alert bg-sky-500 text-white w-96">
          <span className="text-sm">{message}</span>
        </div>
      </div>
    );
  } else {
    return nothing();
  }
};

const NotificationAlert = ({ message }) => {
  return isNotif(message);
};

export default NotificationAlert;
