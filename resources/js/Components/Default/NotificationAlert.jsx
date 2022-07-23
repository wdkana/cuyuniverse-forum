const nothing = () => {
    return "";
};

const isNotif = (message) => {
    if (message) {
        return (
            <div className="flex flex-1 w-[15rem] toast toast-top toast-center z-10">
                <div className="alert bg-indigo-500 text-white">
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
