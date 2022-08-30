import React, {useEffect, useRef, useState} from 'react';
import SweetAlert from "../util/SweetAlert";
import image_icon from '../asset/user_interface/image-icon.png'
import SweetAlertConfirm from "../util/SweetAlertConfirm";

function EditRemoveFootage() {

    const [allImageNameArr, setAllImageNamesArr] = useState([]);
    const [category, setCategory] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [imageTags, setImageTags] = useState("");
    const [imageCategory, setImageCategory] = useState("");
    const [isDefault, setIsDefault] = useState(false);

    const current = new Date();
    const added_date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const inputRef = useRef();
    const buttonRef = useRef();
    const pendingRef = useRef();
    const categoryRef = useRef();
    const tagRef = useRef();

    useEffect(() => {
        buttonRef.current.style.display = 'none';
        pendingRef.current.style.display = 'none';
    },[imageData])

    const loadAllImagesName = async () => {
        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-image-data.php");
        const responseData = await response.json();
        if (responseData.data != null) {
            setAllImageNamesArr(responseData.data);
        } else {
            await SweetAlert(
                "info",
                "Sorry",
                "No image to preview!"
            );
        }
    }

    const loadAllCategories = async () => {
        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-category.php");
        const responseData = await response.json();
        setCategory(responseData.data);
    }

    useEffect(() => {
        loadAllCategories();
        setIsDefault(true);
    }, [])

    const onSearchHandler = (event) => {
        setAllImageNamesArr(allImageNameArr.filter(imageNames => (imageNames.footage_name).includes(event.target.value)));
    }

    const updateImageDetail = async (e) => {

        pendingRef.current.style.display = 'block';

        const tags = imageTags ? imageTags : imageData.tags;
        const category_id = imageCategory ? imageCategory : imageData.category_id;
        const footage_id = imageData.footage_id;

        const requestData = {added_date, tags, category_id, footage_id}

        if (imageData.footage_name === "" || imageData.file_type === "") {
            await SweetAlert(
                "warning",
                "Warning!",
                "Image selection is required. Please brows an image to upload first!"
            );
        } else if (imageData.tags === "") {
            await SweetAlert(
                "warning",
                "Warning!",
                "Image tags are required, Please insert image tags as you need!"
            );
        } else if (imageData.category_id === "") {
            await SweetAlert(
                "warning",
                "Warning!",
                "Image category is required, Please select the category as you need!"
            );
        } else {
            let res = await fetch("http://localhost/projects/drfootage-backend/api/admin/update-image-data.php", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(requestData),
            });
            let resJson = await res.json();

            if (resJson.success === true) {
                pendingRef.current.style.display = 'none';
                await SweetAlert(
                    "success",
                    "Successfully",
                    imageData.footage_name + " has updated!"
                );
            } else {
                pendingRef.current.style.display = 'none';
                await SweetAlert(
                    "error",
                    "Oops...",
                    imageData.footage_name + " upload fail!"
                );
            }
        }
    }

    const updateImageDataHandler = (e) => {
        updateImageDetail();
    }

    useEffect(() => {
        loadAllImagesName();
    }, [imageData]);

    const deleteImage = async (e) => {

        pendingRef.current.style.display = 'block';

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
                body: JSON.stringify({'footage_id' : imageData.footage_id}),
            });

            pendingRef.current.style.display = 'none';

            let resJson = await res.json();
            if (resJson.success === true) {
                pendingRef.current.style.display = 'none';
                await SweetAlert(
                    "success",
                    "Successfully",
                    imageData.footage_name + " has deleted!"
                );
                setCategory([])
                loadAllImagesName();
                setImageData([]);
                setIsDefault(true);
                inputRef.current.value = "";
                categoryRef.current.value = 0;
                tagRef.current.value = "";
            } else {
                pendingRef.current.style.display = 'none';
                await SweetAlert(
                    "error",
                    "Oops...",
                    imageData.footage_name + " delete fail!"
                );
            }
        }
    }

    const deleteImageDataHandler = (e) => {
        deleteImage();
    }

    return (
        <div className="update-remove-image">
            <div ref={pendingRef} className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="content-area">
                <div className="search-bar-dropdown">
                    <div className="search-bar">
                        <div className="row d-flex">
                            <div className="col-12">
                                <input type="text" ref={inputRef} className="form-control footage-inputs mt-0" placeholder="Search..." onChange={onSearchHandler} onClick={(event => {
                                    buttonRef.current.style.display = 'flex';
                                })}/>
                                <ul id="results" className="list-group" ref={buttonRef}>
                                    {
                                        allImageNameArr.map((imageNames, index) => (
                                            <button key={index} type="button" className="list-group-item list-group-item-dark text-end" onClick={(event => {
                                                buttonRef.current.style.display = 'none';
                                                inputRef.current.value = (imageNames.footage_name).split('_')[0];
                                                setImageData(imageNames);
                                                setImageTags("");
                                                setIsDefault(false);
                                            })}>
                                                {(imageNames.footage_name).split('_')[0]}
                                            </button>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image-area mt-2">
                    {!isDefault && <img src={imageData.file_path + imageData.footage_name + "." + imageData.file_type} alt={imageData.footage_name}/>}
                    {isDefault && <img src={image_icon} alt={imageData.footage_name}/>}
                </div>
                <input disabled value={imageData.footage_name || ""} type="text" className="form-control footage-inputs" placeholder="Image Name"/>
                <div className="row">
                    <div className="col-6">
                        <select ref={categoryRef} id="categoryDropDown" value={imageCategory ? imageCategory : imageData.category_id} aria-label="Default select example" className="w-100 footage-inputs form-select" onChange={(event) => setImageCategory(event.target.value)}>
                            <option value="0">Image Category</option>
                            {
                                category.map((categories, index) => (
                                    <option key={index} value={categories.category_id}>{categories.category_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-6">
                        <input disabled value={imageData.file_type || ""} type="text" className="form-control footage-inputs" placeholder="Image Type"/>
                    </div>
                </div>
                <textarea ref={tagRef} value={imageTags ? imageTags : imageData.tags} placeholder="Insert tags one by one" className="w-100 footage-inputs" onChange={(event) => setImageTags(event.target.value)}/>
                <div className="row">
                    <div className="col-8"></div>
                    <div className="col-2">
                        <button className="btn delete-btn" onClick={deleteImageDataHandler}>Delete</button>
                    </div>
                    <div className="col-2">
                        <button className="btn update-btn" onClick={updateImageDataHandler}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditRemoveFootage;