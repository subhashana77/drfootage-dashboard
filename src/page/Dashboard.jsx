import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import NavPanel from "../component/Nav-panel";
import NewFootage from "../component/New-footage";
import NameCard from "../component/Name-card";

function Dashboard(effect, deps) {
    const location = useLocation();
    let userinfo = location.state.userinfo;

    const [infoCardIsShowing, setInfoCardIsShowing] = useState(false);
    const [newFootageIsShowing, setNewFootageIsShowing] = useState(false);

    const nameCardShow = (value) => {
        setInfoCardIsShowing(value);
    }

    const addNewImageDataShow = (value) => {
        setNewFootageIsShowing(value);
    }

    return (
        <div className="container-fluid pt-3 dashboard">
            <div className="row">
                <div className="col-3">
                    <NavPanel
                        userinfo={userinfo}
                        nameCardShow={nameCardShow}
                        addNewImageDataShow={addNewImageDataShow}
                    />
                </div>
                <div className="col-9 p-relative">
                    {
                        infoCardIsShowing && (
                            <NameCard userinfo={userinfo} />
                        )
                    }
                    {
                        newFootageIsShowing && (
                            <NewFootage/>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;