import React, {useEffect, useRef, useState} from 'react';

function EditRemoveFootage(props) {

    const defaultOptions = [];
    for (let i = 0; i < 10; i++) {
        defaultOptions.push(`option ${i}`);
        defaultOptions.push(`suggestion ${i}`);
        defaultOptions.push(`advice ${i}`);
    }

    const [options, setOptions] = useState([]);

    const ulRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.addEventListener('click', (event) => {
            event.stopPropagation();
            ulRef.current.style.display = 'flex';
            onSearchHandler(event);
        })
        document.addEventListener('click', (event) => {
            ulRef.current.style.display = 'none';
        });
    },[]);

    const onSearchHandler = (event) => {
        setOptions(defaultOptions.filter(option => option.includes(event.target.value)));
    }

    return (
        <div className="search-bar-dropdown">
            <input id="search-bar" type="text" ref={inputRef} className="form-control" placeholder="Search" onChange={onSearchHandler}/>
            <ul id="results" className="list-group" ref={ulRef}>
                {
                    options.map((option, index) => (
                        <button key={index} type="button" className="list-group-item list-group-item-dark" onClick={(e) =>{
                            inputRef.current.value = option;
                        }}>
                            {option}
                        </button>
                    ))
                }
            </ul>
            <button className="btn btn-primary">Search</button>
        </div>
    );
}

export default EditRemoveFootage;