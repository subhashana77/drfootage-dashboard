import Swal from "sweetalert2";

const SweetAlertConfirm = (icon, title, text, confirmBtnTxt) => {
    return (
        Swal.fire({
            title : title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#01a70d',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmBtnTxt
        })
    );
}

export default SweetAlertConfirm;
