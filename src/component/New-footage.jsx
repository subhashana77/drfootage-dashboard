import React, {useState} from 'react';
import FileUpload from "./File-upload";

function NewFootage(props) {
    const [files, setFiles] = useState([{
        name: 'myFile.pdf'
    }]);

    return (
        <div>
            <FileUpload files={files} setFiles={setFiles} />
        </div>
    );
}

export default NewFootage;