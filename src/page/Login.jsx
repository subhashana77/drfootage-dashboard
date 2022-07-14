import React, {useState} from 'react';
import Sweetalert from "../util/Sweetalert";
import {useNavigate} from "react-router-dom";


function Login() {

    const [admin_username, setUsername] = useState('');
    const [admin_password, setPassword] = useState('');

    let navigate = useNavigate();

    const loginHandler = async (e) => {

        e.preventDefault();

        const requestData = {admin_username, admin_password};

        if (admin_username === "" || admin_password === "") {
            await Sweetalert (
                "warning",
                "Warning!",
                "Username and password are required!"
            );
        } else {
            try {
                const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/login.php", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(requestData),
                });

                const results = await response.json();

                if (results.success === true) {
                    setUsername(() => "");
                    setPassword(() => "");

                    // console.log(results.data);

                    navigate('/dashboard', {state:{userinfo:results.data}});

                } else {
                    await Sweetalert (
                        "error",
                        "Oops...",
                        admin_username + " login fail!"
                    );
                }

            } catch (err) {
                console.log (err.message)
            }
        }
    }

    return (
        <div className="main-background">
            <div className="container">
                <div className="row login-area">
                    <div className="col-md-6 col-sm-12 form-area">
                        <div className="login-form pt-5 pb-5">
                            <h2>Login</h2>
                            <p>Get in to see more miracles, hurry!</p>
                            <form className="pt-4">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username*</label>
                                    <input required value={admin_username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password*</label>
                                    <input required value={admin_password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password"/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6 col-sm-12 remember-me">
                                        <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"/>
                                        <span className="ps-2">Remember Me</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 forget-password">
                                        <a href="tel:+94778152905">Forget Password?</a>
                                    </div>
                                </div>
                                <div className="mb-3 login-button">
                                    <button onClick={loginHandler}>Login</button>
                                </div>
                                <div className="mb-3 not-register">
                                    <span>Not Registered Yet?</span>
                                    <a href="tel:+94778152905">Contact Administrator</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 image-area"></div>
                </div>
            </div>
        </div>
    );
}

export default Login;