import React from 'react';

function Login(props) {
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
                                    <input type="email" className="form-control" id="username" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password*</label>
                                    <input type="password" className="form-control" id="password"/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6 col-sm-12 remember-me">
                                        <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"/>
                                        <span className="ps-2">Remember Me</span>
                                    </div>
                                    <div className="col-md-6 col-sm-12 forget-password">
                                        <a href="#">Forget Password?</a>
                                    </div>
                                </div>
                                <div className="mb-3 login-button">
                                    <button>Login</button>
                                </div>
                                <div className="mb-3 not-register">
                                    <span>Not Registered Yet?</span>
                                    <a href="#">Contact Administrator</a>
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