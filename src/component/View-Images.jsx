import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SweetAlertConfirm from "../util/SweetAlertConfirm";
import SweetAlert from "../util/SweetAlert";

const ViewImages = () => {

    const [category, setCategory] = useState([]);
    const [imageCategory, setImageCategory] = useState('');
    const [imageData, setImageData] = useState([]);
    const pendingRef = useRef();

    const loadAllCategories = async () => {
        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-category.php");
        const responseData = await response.json();
        setCategory(responseData.data);
    }
    const loadAllImagesName = async () => {
        pendingRef.current.style.display = 'block';

        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-image-data.php");
        const responseData = await response.json();

        if (responseData.data != null) {
            pendingRef.current.style.display = 'none';
            setImageData(responseData.data);
        } else {
            await SweetAlert(
                "info",
                "Sorry",
                "No image to preview!"
            );
        }
        console.log(responseData.data)
    }

    const deleteImageHandler = async (footage_id, image_name) => {
        let isConfirmed = false;

        await SweetAlertConfirm(
            "warning",
            "Are you sure?",
            "You won't be able to revert this!",
            "Delete",
        ).then((result) => {
            if (result.isConfirmed) {
                isConfirmed = true;
            }
        })

        if (isConfirmed) {
            let res = await fetch("http://localhost/projects/drfootage-backend/api/admin/delete-image.php", {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({'footage_id': footage_id}),
            });
            let resJson = await res.json();
            if (resJson.success === true) {
                await SweetAlert(
                    "success",
                    "Successfully",
                    image_name + " has deleted!"
                );
                loadAllImagesName();
            } else {
                await SweetAlert(
                    "error",
                    "Oops...",
                    image_name + " delete fail!"
                );
            }
        }
    }

    useEffect(() => {
        pendingRef.current.style.display = 'none';
        loadAllCategories();
        loadAllImagesName();
    }, []);

    return (
        <div className="show-all-footage pe-3">
            <hr/>
            <div className="row pe-3 ps-2">
                <div className="col-6 ps-1 pe-1">
                    <input type="text" className="form-control" placeholder="Names here..."/>
                </div>
                <div className="col-2 ps-1 pe-1">
                    <select aria-label="Default select example" className="form-select">
                        <option value="0">Type</option>
                        <option defaultValue value={"jpg"}>JPG</option>
                        <option value={"png"}>PNG</option>
                        <option value={"tiff"}>TIFF</option>
                    </select>
                </div>
                <div className="col-2 ps-1 pe-1">
                    <select value={imageCategory} aria-label="Default select example" className="form-select" onChange={(event) => setImageCategory(event.target.value)}>
                        <option value="0">Category</option>
                        {
                            category.map((categories, index) => (
                                <option key={index} value={categories.category_id}>{categories.category_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-2 ps-1 pe-1">
                    <input type="text" className="form-control" placeholder="Tags here..."/>
                </div>
            </div>
            <hr/>
            <div className="row">

                <div ref={pendingRef} className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>

                {
                    imageData.map((imageDetails, index) => (
                        <div key={index} className="col-4">
                            <div className="image-container">
                                <img src={imageDetails.file_path + imageDetails.footage_name + '.' + imageDetails.file_type} alt="Avatar" className="image"/>
                                <div className="overlay">
                                    <div className="row">
                                        <div className="col-5 delete-img-btn">
                                            <button onClick={(event => {
                                                console.log(imageDetails.footage_id);
                                                deleteImageHandler(imageDetails.footage_id, imageDetails.footage_name);
                                            })}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72
                                                    0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16
                                                    16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9
                                                    45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="col-2"></div>
                                        <div className="col-5 image-type">
                                            <p>{imageDetails.file_type}</p>
                                        </div>
                                    </div>
                                    <div className="text">{(imageDetails.footage_name).split('_')[0]}</div>
                                    <p className="tags pt-5">{imageDetails.tags}</p>
                                    <div className="row">
                                        <div className="col-6 image-date">
                                            <p>{imageDetails.added_date}</p>
                                        </div>
                                        <div className="col-6 image-category">
                                            <select disabled value={imageDetails.category_id} aria-label="Default select example" className="form-select">
                                                <option value="0">Category</option>
                                                {
                                                    category.map((categories, index) => (
                                                        <option key={index} value={categories.category_id}>{categories.category_name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ViewImages;
