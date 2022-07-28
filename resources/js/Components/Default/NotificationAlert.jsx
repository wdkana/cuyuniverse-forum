import React from "react";

const nothing = () => {
  return "";
};

const isNotif = message => {
  if (message) {
    return (
      <div className="toast toast-top toast-center z-10 ">
        <div className="alert bg-primary dark:bg-slate-700 dark:text-slate-300">
          <span className="text-sm">{message}</span>
        </div>
      </div>
    );
  } else {
    return nothing();
  }
};

const NotificationAlert = ({message}) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(true);
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [message]);

  if (!show) return null;
  return isNotif(message);
};

export default NotificationAlert;
