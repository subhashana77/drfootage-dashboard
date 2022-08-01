import React from 'react';
import logo from '../asset/user_interface/logo.png';

function NavPanel({userinfo, nameCardShow, addNewImageDataShow, editRemoveFootageShow, loadAllImagesName}) {

    const nameCardHandler = () => {
        addNewImageDataShow(false);
        editRemoveFootageShow(false);
        nameCardShow(true);
    }

    const addNewImageHandler = () => {
        nameCardShow(false);
        editRemoveFootageShow(false);
        addNewImageDataShow(true);
    }

    const editRemoveImageHandler = () => {
        nameCardShow(false);
        addNewImageDataShow(false);
        editRemoveFootageShow(true);
        // loadAllImagesName();
    }

    return (
        <div className="nav-pane">
            <div className="logo">
                <img src={logo} alt="DRFootage Logo"/>
            </div>
            <div className="identification mb-5">
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
            <div onClick={addNewImageHandler} className="add-footage">
                <div className="nav-item">
                    <div className="row">
                        <div className="col-2 mt-auto mb-auto">
                            <svg className="nav-icon float-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256
                                512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368
                                269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144
                                232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232
                                357.3 242.7 368 256 368z"/>
                            </svg>
                        </div>
                        <div className="col-8 mt-auto mb-auto">
                            <p className="float-start">Add new images</p>
                        </div>
                        <div className="col-2 mt-auto mb-auto">
                            <svg className="nav-enter-icon float-end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38
                                118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160
                                160C80.38 444.9 72.19 448 64 448z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={editRemoveImageHandler} className="add-footage">
                <div className="nav-item">
                    <div className="row">
                        <div className="col-2 mt-auto mb-auto">
                            <svg className="nav-icon float-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256
                                512C114.6 512 0 397.4 0 256zM168 232C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168
                                280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H168z"/>
                            </svg>
                        </div>
                        <div className="col-8 mt-auto mb-auto">
                            <p className="float-start">Edit/Remove footages</p>
                        </div>
                        <div className="col-2 mt-auto mb-auto">
                            <svg className="nav-enter-icon float-end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38
                                118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160
                                160C80.38 444.9 72.19 448 64 448z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavPanel;