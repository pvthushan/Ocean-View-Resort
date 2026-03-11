// Small wrapper to provide a global `showAlert(message, type)` function
// that maps existing calls to SweetAlert2. Keeps the same simple API
// used across the project (message, type) where type can be 'success',
// 'dan


(function() {
    if (typeof Swal === 'undefined') {
        console.warn('SweetAlert2 (Swal) is not loaded. Please include the CDN script before this file.');
        return;
    }

    window.showAlert = function(message, type) {
        let icon = 'info';
        if (!type) type = 'info';
        if (type === 'success') icon = 'success';
        else if (type === 'danger' || type === 'error') icon = 'error';
        else if (type === 'warning') icon = 'warning';
        else if (type === 'info') icon = 'info';

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: icon,
            title: message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                popup: 'swal2-toast-custom'
            }
        });
    };

})();

