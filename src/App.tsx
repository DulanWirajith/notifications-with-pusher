import React, {useState} from 'react';
import './App.css';
import {Notifications} from "./notifications";

function App() {
    const [userName, setUserName] = useState<string>("");

    return (
        <div className="App">
            <div>
                Notifications HERE
            </div>
            =======================
            <Notifications></Notifications>
            {/*<div>*/}
            {/*    {notifications.map((object, i) => {*/}
            {/*        console.log(object);*/}
            {/*        return (<div>*/}
            {/*            {object}*/}
            {/*        </div>)*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
