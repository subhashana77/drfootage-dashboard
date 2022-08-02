import React from 'react';
import logo from '../asset/user_interface/logo.png';

function NavPanel({userinfo, nameCardShow, addNewImageDataShow, editRemoveFootageShow, showFootageShow}) {

    const nameCardHandler = () => {
        addNewImageDataShow(false);
        editRemoveFootageShow(false);
        showFootageShow(false);
        nameCardShow(true);
    }

    const addNewImageHandler = () => {
        nameCardShow(false);
        editRemoveFootageShow(false);
        showFootageShow(false);
        addNewImageDataShow(true);
    }

    const editRemoveImageHandler = () => {
        nameCardShow(false);
        addNewImageDataShow(false);
        showFootageShow(false);
        editRemoveFootageShow(true);
    }

    const showImageHandler = () => {
        nameCardShow(false);
        addNewImageDataShow(false);
        editRemoveFootageShow(false);
        showFootageShow(true);
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
                            <p className="float-start">Add New Images</p>
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
                            <svg className="nav-icon float-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4
                                1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8
                                0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2
                                90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2
                                0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5
                                48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
                            </svg>
                        </div>
                        <div className="col-8 mt-auto mb-auto">
                            <p className="float-start">Edit/Remove Footage</p>
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
            <div onClick={showImageHandler} className="add-footage">
                <div className="nav-item">
                    <div className="row">
                        <div className="col-2 mt-auto mb-auto">
                            <svg className="nav-icon float-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51
                                21.49-48 48-48h16v208c0 44.112 35.888 80 80 80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51
                                0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49 48-48zM256 128c0
                                26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-96
                                144l55.515-55.515c4.686-4.686 12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686
                                12.284-4.686 16.971 0L512 208v112H160v-48z"/>
                            </svg>
                        </div>
                        <div className="col-8 mt-auto mb-auto">
                            <p className="float-start">Show Footage</p>
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