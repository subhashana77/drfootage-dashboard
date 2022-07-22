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
            loadAllImagesName();
        })
        document.addEventListener('click', (event) => {
            buttonRef.current.style.display = 'none';
            loadAllImagesName();
        });
    }, []);

    const onSearchHandler = (event) => {
        setAllImageNamesArr(allImageNameArr.filter(imageNames => (imageNames.footage_name).includes(event.target.value)));
    }


    const searchImageHandler = (e) => {
        alert(inputRef.current.value + "_" + localStorage.getItem("uniqueIdPart"));
    }

    return (
        <div className="search-bar-dropdown">
            <div className="search-bar">
                <div className="row">
                    <div className="col-10">
                        <input id="search-bar" type="text" ref={inputRef} className="form-control" placeholder="Search..." onChange={onSearchHandler}/>
                        <ul id="results" className="list-group" ref={buttonRef}>
                            {
                                allImageNameArr.map((imageNames, index) => (
                                    <button key={index} type="button" className="list-group-item list-group-item-dark text-end" onClick={(event => {
                                        inputRef.current.value = (imageNames.footage_name).split('_')[0];
                                        localStorage.setItem("uniqueIdPart", (imageNames.footage_name).split('_')[1]);
                                    })}>
                                        {(imageNames.footage_name).split('_')[0]}
                                    </button>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-2">
                        <button className="btn search-button" onClick={searchImageHandler}>Search</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EditRemoveFootage;