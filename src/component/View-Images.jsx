import React, {useEffect, useState} from 'react';

const ViewImages = () => {

    const [category, setCategory] = useState([]);
    const [imageCategory, setImageCategory] = useState('');

    const loadAllCategories = async () => {
        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-category.php");
        const responseData = await response.json();
        setCategory(responseData.data);
    }

    useEffect(() => {
        loadAllCategories();
    }, [category]);

    return (
        <div className="show-all-footage pe-2">
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
        </div>
    );
};

export default ViewImages;
