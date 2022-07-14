import React from 'react';
import male_avatar from '../asset/user_interface/male_avatar.png'

function NameCard({userinfo}) {

    const handleClick = () => {
        if (document.getElementById('id-password').type === 'password') {
            document.getElementById('id-password').type = 'text';
            document.getElementById('type-change-btn').innerText = 'hide';
        } else {
            document.getElementById('id-password').type = 'password';
            document.getElementById('type-change-btn').innerText = 'show';
        }
    }

    return (
        <div className="card-body">
            <div className="row">
                <div className="col-4 text-center">
                    <img src={male_avatar} alt="male avatar" className="w-100"/>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-3">
                            <h4>Name</h4>
                            <h5>Title</h5>
                            <h5>Role</h5>
                            <h5>Email</h5>
                            <h5>Telephone</h5>
                            <h5>Username</h5>
                            <h5>Password</h5>
                        </div>
                        {
                            userinfo.map((info) => (
                                <div className="col-9" key={info.admin_id}>
                                    <input disabled type="text" value={': ' + info.admin_name} className="w-100"/>
                                    <input disabled type="text" value={': ' + info.admin_title} className="w-100"/>
                                    <input disabled type="text" value={': ' + info.admin_role} className="w-100"/>
                                    <input disabled type="text" value={': ' + info.admin_email} className="w-100"/>
                                    <input disabled type="text" value={': ' + info.admin_telephone} className="w-100"/>
                                    <input disabled type="text" value={': ' + info.admin_username} className="w-100"/>
                                    <div className="d-flex password-filed">
                                        <input disabled type="password" value={info.admin_password} className="w-100" id="id-password"/>
                                        <a id="type-change-btn" onClick={handleClick}>show</a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NameCard;