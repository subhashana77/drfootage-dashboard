import React, {useEffect, useRef, useState} from 'react';
import image_icon from '../asset/user_interface/image-icon.png'
import SweetAlert from "../util/SweetAlert";
import { v4 as uuid } from 'uuid';

function FileUpload() {

    const [base64, setBaseImage] = useState("");
    const [currentName, setCurrentName] = useState("");
    const [newName, setNewName] = useState("");
    const [file_type, setNewType] = useState("");
    const [category_id, setNewCategory] = useState(0);
    const [tags, setNewTag] = useState("");
    const [category, setCategory] = useState([]);

    const current = new Date();
    const added_date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const pendingRef = useRef();

    useEffect(() => {
        pendingRef.current.style.display = 'none';
    },[])

    const uploadHandler = async (e) => {
        const file = e.target.files[0];
        const base64Code =  await convertBase64(file)
        setBaseImage(base64Code);
        setCurrentName(file.name);
    }

    const convertBase64 = (file) => {
        return new  Promise((resolve, reject) => {
            const fileReader =new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const removeImageHandler = () => {
        setBaseImage("");
        setCurrentName("");
        setNewName("");
        setNewCategory(0);
        setNewType("");
        setNewTag("");
    }

    const loadAllCategories = async () => {
        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-category.php");
        const responseData = await response.json();
        setCategory(responseData.data);
    }

    useEffect(() => {
        loadAllCategories().then(() => (
            console.log("all category loaded")
        ));
    }, []);

    const footageUploadHandler = async (e) => {
        e.preventDefault();

        pendingRef.current.style.display = 'block';

        const footage_name = newName + "_" + uuid();
        const base64_code = base64.split(",")[1];

        const requestData = {footage_name, file_type, added_date, tags, category_id, base64_code}

        try {
            let res = await fetch("http://localhost/projects/drfootage-backend/api/admin/save-image.php", {
                method : "POST",
                headers : {"content-type": "application/json"},
                body : JSON.stringify(requestData),
            });

            let responseJson = await res.json();

                    setBaseImage("");
                    setCurrentName("");
                    setNewName("");
                    setNewCategory(0);
                    setNewType("");
                    setNewTag("");

            if (responseJson.success === true) {
                pendingRef.current.style.display = 'none';
                await SweetAlert(
                    "success",
                    "Successfully",
                    footage_name + " has registered!"
                );

            } else {
                pendingRef.current.style.display = 'none';
                await SweetAlert(
                    "error",
                    "Oops...",
                    newName + " upload fail!"
                );
            }
        } catch (error)  {
            pendingRef.current.style.display = 'none';
            await SweetAlert(
                "error",
                "Oops...",
                newName + " upload fail! - " + error.message
            );
            console.log(error);
        }
    }

    return (
        <div>
            <div ref={pendingRef} className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="file-card">
                <div className="file-inputs">
                    <input id="custom-file" type="file" onChange={uploadHandler}/>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256
                            8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6
                            0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6
                            5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"/>
                        </svg>
                        Brows
                    </button>
                </div>
                <p className="main mb-2 font-weight-bold">Support files</p>
                <p className="info">JPG, PNG, TIFF</p>
            </div>
            <div className="row thumb-row">
                <div className="col-3 thumbnail ps-0">
                    <img src={base64 ? base64 : image_icon} alt=""/>
                </div>
                <div className="col-9 details">
                    <div className="name-label">
                        <svg className="icon-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M384 121.941V128H256V0h6.059a24 24 0 0 1 16.97 7.029l97.941 97.941a24.002 24.002
                            0 0 1 7.03 16.971zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255
                            10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zm-135.455 16c26.51 0 48 21.49 48
                            48s-21.49 48-48 48-48-21.49-48-48 21.491-48 48-48zm208 240h-256l.485-48.485L104.545
                            328c4.686-4.686 11.799-4.201 16.485.485L160.545 368 264.06 264.485c4.686-4.686 12.284-4.686
                            16.971 0L320.545 304v112z"/>
                        </svg>
                        <input placeholder="Footage_Name.jpg" type="text" disabled value={currentName} className="w-100 footage-name" />
                        {
                            base64 ?
                                <button onClick={removeImageHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4
                                            13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16
                                            16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/>
                                    </svg>
                                </button>
                                :
                                <button/>
                        }
                    </div>
                    <div className="name-label">
                        <svg className="icon-image name-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M218.17 424.14c-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02
                            6.19l-7.67 15.34c-6.37 12.78-25.03 11.37-29.48-2.09L144 386.59l-10.61
                            31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16
                            16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41
                            22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.75-16.19 54.06-9.7 66
                            14.16 1.89 3.78 5.49 5.95 9.36 6.26v-82.12l128-127.09V160H248c-13.2
                            0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3
                            0 24-10.7 24-24v-40l-128-.11c-16.12-.31-30.58-9.28-37.83-23.75zM384
                            121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1zm-96
                            225.06V416h68.99l161.68-162.78-67.88-67.88L288
                            346.96zm280.54-179.63l-31.87-31.87c-9.94-9.94-26.07-9.94-36.01 0l-27.25 27.25
                            67.88 67.88 27.25-27.25c9.95-9.94 9.95-26.07 0-36.01z"/>
                        </svg>
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Image uploading name" className="w-100 footage-inputs" />
                    </div>
                    <div className="name-label">
                        <div className="row w-75">
                            <div className="col-6 d-flex pe-0">
                                <svg className="icon-image type-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path d="M608 0H160a32 32 0 0 0-32 32v96h160V64h192v320h128a32 32 0 0 0
                                    32-32V32a32 32 0 0 0-32-32zM232 103a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9
                                    9 0 0 1 9-9h30a9 9 0 0 1 9 9zm352 208a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9
                                    9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9
                                    9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9
                                    9 0 0 1 9-9h30a9 9 0 0 1 9 9zm-168 57H32a32 32 0 0 0-32 32v288a32 32 0 0
                                    0 32 32h384a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM96 224a32 32 0 1
                                    1-32 32 32 32 0 0 1 32-32zm288 224H64v-32l64-64 32 32 128-128 96 96z"/>
                                </svg>
                                <select value={file_type} aria-label="Default select example" onChange={(e) => setNewType(e.target.value)} className="w-100 footage-inputs form-select">
                                    <option value="0">Image Type</option>
                                    <option defaultValue value={"jpg"}>JPG</option>
                                    <option value={"png"}>PNG</option>
                                    <option value={"tiff"}>TIFF</option>
                                </select>
                            </div>
                            <div className="col-6 d-flex pe-0">
                                <svg className="icon-image category-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51
                                    0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112
                                    0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48
                                    48h288c26.51 0 48-21.49 48-48v-48H176z"/>
                                </svg>
                                <select value={category_id} aria-label="Default select example" onChange={(e) => setNewCategory(e.target.value)} className="w-100 footage-inputs form-select">
                                    <option value="0">Image Category</option>
                                    {
                                        category.map((categories, index) => (
                                            <option key={index} value={categories.category_id}>{categories.category_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="name-label">
                        <svg className="icon-image category-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0
                            48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882
                            0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51
                            0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823
                            497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999
                            26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941
                            14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"/>
                        </svg>
                        <textarea value={tags} onChange={(e) => setNewTag(e.target.value)} placeholder="Insert tags one by one" className="w-100 footage-inputs "/>
                    </div>
                </div>
            </div>
            <div className="w-100 upload-btn">
                <div className="row">
                    <div className="col-9"></div>
                    <div className="col-3">
                        <button className="w-100" onClick={footageUploadHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5
                    19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0
                    13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56
                    56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20
                    20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                            </svg>
                            Upload
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FileUpload;