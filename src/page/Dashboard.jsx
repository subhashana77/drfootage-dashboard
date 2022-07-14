import React from 'react';
import {useLocation} from "react-router-dom";
import NavPanel from "../component/Nav-panel";
import NameCard from "../component/Name-card";
import NewFootage from "../component/New-footage";

function Dashboard(props) {
    const location = useLocation();
    let userinfo = location.state.userinfo;
    console.log(userinfo);
    return (
        <div className="container-fluid pt-3 dashboard">
            <div className="row">
                <div className="col-3"><NavPanel userinfo={userinfo} /></div>
                <div className="col-9 p-relative">
                    {/*<NameCard userinfo={userinfo}/>*/}
                    <NewFootage/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;