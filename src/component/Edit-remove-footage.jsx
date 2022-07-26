import React, {useEffect, useRef, useState} from 'react';
import image_icon from '../asset/user_interface/image-icon.png'

function EditRemoveFootage() {

    const [allImageNameArr, setAllImageNamesArr] = useState([]);
    const [footage_name, setImageName] = useState("")
    const [imageDetail, setImageDetail] = useState([]);
    const [category, setCategory] = useState([]);
    const [category_name, setSelectedCategory] = useState("");

    const [file_type, setNewType] = useState("");
    // const [category_id, setCategoryId] = useState(0);

    // let categoryName = "";

    const inputRef = useRef();
    const buttonRef = useRef();

    const loadAllImagesName = async () => {
        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-image-name.php");
        const responseData = await response.json();
        setAllImageNamesArr(responseData.data);
    }

    const loadAllCategories = async () => {
        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-category.php");
        const responseData = await response.json();
        setCategory(responseData.data);
    }

    useEffect(() => {
        loadAllImagesName();
        inputRef.current.addEventListener('click', (event) => {
            event.stopPropagation();
            buttonRef.current.style.display = 'flex';
            loadAllImagesName();
        })
        document.addEventListener('click', (event) => {
            buttonRef.current.style.display = 'none';
            loadAllImagesName();
        });

    }, [imageDetail]);

    useEffect(() => {
        loadAllCategories();
    }, [category])

    const onSearchHandler = (event) => {
        setAllImageNamesArr(allImageNameArr.filter(imageNames => (imageNames.footage_name).includes(event.target.value)));
    }

    const selectedImageName = {footage_name}
    const searchImageHandler = async (e) => {
        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-image-data.php", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(selectedImageName),
        });
        const results = await response.json();
        (results.data).map((imageData) => (
            setImageDetail(imageData)
        ));
        setSelectedCategory(imageDetail.selected_category_id);
    }

    return (
        <div className="update-remove-image">
            <div className="search-bar-dropdown">
                <div className="search-bar">
                    <div className="row d-flex">
                        <div className="col-10 mt-auto mb-auto">
                            <input id="search-bar" type="text" ref={inputRef} className="form-control footage-inputs mt-0" placeholder="Search..." onChange={onSearchHandler}/>
                            <ul id="results" className="list-group" ref={buttonRef}>
                                {
                                    allImageNameArr.map((imageNames, index) => (
                                        <button key={index} type="button" className="list-group-item list-group-item-dark text-end" onClick={(event => {
                                            inputRef.current.value = (imageNames.footage_name).split('_')[0];
                                            setImageName((imageNames.footage_name).split('_')[0] + "_" +(imageNames.footage_name).split('_')[1])
                                            // setCategoryId(imageNames.footage_id);
                                        })}>
                                            {(imageNames.footage_name).split('_')[0]}
                                        </button>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-2 mt-auto mb-auto">
                            <button className="btn search-button" onClick={searchImageHandler}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="image-area mt-2">
                <img src={imageDetail.file_path + imageDetail.footage_name + "." + imageDetail.file_type} alt={imageDetail.footage_name}/>
            </div>
            <input value={imageDetail.footage_name ||""} type="text" className="form-control footage-inputs" placeholder="Image Name"/>
            <div className="row">
                <div className="col-6">
                    <select id="categoryDropDown" value={category_name} aria-label="Default select example" onChange={(e) => setSelectedCategory(e.target.value)} className="w-100 footage-inputs form-select">
                        {/*<option value="0">{selected_category}</option>*/}
                        <option value="0">Image Category</option>
                        {
                            category.map((categories, index) => (
                                <option key={index} value={categories.category_id}>{categories.category_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-6">
                    <select value={file_type ? file_type : imageDetail.file_type} aria-label="Default select example" onChange={(e) => setNewType(e.target.value)} className="w-100 footage-inputs form-select">
                        <option value="0">Image Type</option>
                        <option defaultValue value={"jpg"}>JPG</option>
                        <option value={"png"}>PNG</option>
                        <option value={"tiff"}>TIFF</option>
                    </select>
                </div>
            </div>
            <textarea value={imageDetail.tags} placeholder="Insert tags one by one" className="w-100 footage-inputs"/>
            <div className="row">
                <div className="col-6">
                    <button className="btn delete-btn">Delete</button>
                </div>
                <div className="col-6">
                    <button className="btn update-btn">Update</button>
                </div>
            </div>
        </div>
    );
}

export default EditRemoveFootage;