import React from 'react';
import logo from '../asset/user_interface/logo.png';

function NavPanel({userinfo}) {

    const nameCardHandler = () => {

    }

    return (
        <div className="nav-pane">
            <div className="logo">
                <img src={logo} alt="DRFootage Logo"/>
            </div>
            <div className="identification">
                {
                    userinfo.map((info) => (
                        <div onClick={nameCardHandler} className="name-card" key={info.admin_id}>
                            <div className="row">
                                <div className="col-10">
                                    <h4>{info.admin_name}</h4>
                                    <p>{info.admin_role}</p>
                                </div>
                                <div className="col-2 text-center">
                                    <svg viewBox="0 0 320 512">
                                        <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160
                                         384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516
                                          223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62
                                           7.781 29.58 19.75S319.8 237.5 310.6 246.6z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default NavPanel;