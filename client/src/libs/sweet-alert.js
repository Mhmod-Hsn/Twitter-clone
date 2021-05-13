import swal from 'sweetalert2'

window.swal = swal.mixin({
    showCancelButton: true,
    showConfirmButton: true,
    customClass: {
        confirmButton: 'bg-red-500',
        cancelButton: 'bg-green-500',
    },
});

const toast = swal.mixin({

    toast: true,
    position: 'top',
    icon: 'success',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer)
    }
});
window.toast = toast;
