import React, {useEffect, useRef, useState} from 'react';

function EditRemoveFootage() {

    const [allImageNameArr, setAllImageNamesArr] = useState([]);

    const inputRef = useRef();
    const buttonRef = useRef();

    const loadAllImagesName = async () => {
        const response = await fetch("http://localhost/projects/drfootage-backend/api/admin/get-image-name.php");
        const responseData = await response.json();
        setAllImageNamesArr(responseData.data);
    }

    useEffect(() => {
        loadAllImagesName().then(() => (
            console.log("all images names are loaded")
        ));
        inputRef.current.addEventListener('click', (event) => {
            event.stopPropagation();
            buttonRef.current.style.display = 'flex';
        })
        document.addEventListener('click', (event) => {
            buttonRef.current.style.display = 'none';
        });
    }, []);


    return (
        <div className="search-bar-dropdown">
            <input id="search-bar" ref={inputRef} type="text" className="form-control" placeholder="Search"/>
            <ul id="results" className="list-group" ref={buttonRef}>
                {
                    allImageNameArr.map((imageNames, index) => (
                        <button key={index} type="button" className="list-group-item list-group-item-dark text-end" onClick={(event => {
                            inputRef.current.value = imageNames.footage_name;
                        })}>
                            {imageNames.footage_name}
                        </button>
                    ))
                }
            </ul>
            <button className="btn btn-primary">Search</button>
        </div>
    );
}

export default EditRemoveFootage;