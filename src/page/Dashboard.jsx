import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import NavPanel from "../component/Nav-panel";
import NewFootage from "../component/New-footage";
import NameCard from "../component/Name-card";
import EditRemoveFootage from "../component/Edit-remove-footage";
import ViewImages from "../component/View-Images";

function Dashboard() {
    const location = useLocation();
    let userinfo = location.state.userinfo;

    const [infoCardIsShowing, setInfoCardIsShowing] = useState(false);
    const [newFootageIsShowing, setNewFootageIsShowing] = useState(false);
    const [editRemoveFootageIsShowing, setEditRemoveFootageIsShowing] = useState(false)
    const [showFootageIsShowing, setShowFootageIsShowing] = useState(false)

    const nameCardShow = (value) => {
        setInfoCardIsShowing(value);
    }

    const addNewImageDataShow = (value) => {
        setNewFootageIsShowing(value);
    }

    const editRemoveFootageShow = (value) => {
        setEditRemoveFootageIsShowing(value);
    }

    const showFootageShow = (value) => {
        setShowFootageIsShowing(value);
    }

    return (
        <div className="container-fluid pt-3 dashboard">
            <div className="row">
                <div className="col-3">
                    <NavPanel
                        userinfo={userinfo}
                        nameCardShow={nameCardShow}
                        addNewImageDataShow={addNewImageDataShow}
                        editRemoveFootageShow={editRemoveFootageShow}
                        showFootageShow={showFootageShow}
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
                    {
                        editRemoveFootageIsShowing && (
                            <EditRemoveFootage/>
                        )
                    }
                    {
                        showFootageIsShowing && (
                            <ViewImages/>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;