import React from "react";
import Swal from "sweetalert2";

const Sweetalert = (icon, title, text) => {
    return (
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        })
    );
}

export default Sweetalert;
