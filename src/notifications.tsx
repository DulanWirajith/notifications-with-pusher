import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const userId = "39fd824c-4b63-4de5-97b5-407965d70106";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImUuYW5hZG9sQGdtYWlsLmNvbSIsImlhdCI6MTY2NDI2MTgwMiwiZXhwIjoxNjY2MjcxODAyfQ.iOQc5HskVyC8ZY-YqIhIgjKJLep3CGqg370fB_xiJNE";

  const getNotifications = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://localhost:3333/notifications", config)
      .then((data: any) => {
        setNotifications(data.data);
        let newNotifCount = 0;
        data.data.map((notif: any) => {
          if (notif.readAt === null) {
            newNotifCount++;
          }
        });
        setNewNotificationCount(newNotifCount);
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  };

  useEffect(() => {
    const pusher = new Pusher(`${process.env.REACT_APP_KEY}`, {
      cluster: `${process.env.REACT_APP_CLUSTER}`,
      authEndpoint: "http://localhost:3333/notifications/auth",
      auth: {
        params: {
          userId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const channel = pusher.subscribe(`private-notifications-${userId}`);

    channel.bind("pusher:subscription_succeeded", (members: any) => {
      getNotifications();
    });

    channel.bind("new_notification", (data: any) => {
      setNotifications(prestate => [data, ...prestate])
    });

    return () => {
      pusher.unsubscribe(`private-notifications-${userId}`);
    };
  }, []);

  useEffect(() => {
    let newNotifCount = 0;
    notifications.map((notif: any) => {
      if (notif.readAt === null) {
        newNotifCount++;
      }
    });
    setNewNotificationCount(newNotifCount);
  }, [notifications])


  return (
    <div style={{alignItems:"flex-start", display:'flex'}} >
    <div style={{width: '50%', alignItems:'center'}}>
      <div>
      <h2>UNREAD NOTIFICATIONS COUNT = {newNotificationCount}</h2>
      </div>
      {notifications.map((object, i) => {
        return (
          <div
            key={object.id}
            style={{
              border: "1px solid blue",
              margin: "8px",
              backgroundColor: `${
                object?.readAt === null ? "greenyellow" : null
              }`,
            }}
          >
            <p>{`title: ${object?.title!} description: ${object?.description!} `}</p>
            <p>{`isRead: ${object?.readAt === null ? false : true}`}</p>
          </div>
        );
      })}
    </div>
    <div style={{height:"500px", display:'flex', alignItems:'center'}}>
      <h3> * Unread Notificaions are highlighted with green color</h3>
    </div>
    </div>

  );
}
