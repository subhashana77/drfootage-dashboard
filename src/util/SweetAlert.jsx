import Swal from "sweetalert2";

const SweetAlert = (icon, title, text) => {
    return (
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        })
    );
}

export default SweetAlert;
