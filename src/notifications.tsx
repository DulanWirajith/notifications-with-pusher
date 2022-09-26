import React, {useEffect, useState} from "react";

export const Notifications = ()=>{
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(()=>{
        setNotifications(['asdf', 'fda', 'fafda']);
    },[])
    return (<div>
        {notifications.map((object, i) => {
            console.log(object);
            return (<div>
                {object}
            </div>)
        })}
    </div>);
}
