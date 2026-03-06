document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('bookingForm');
    const alertPlaceholder = document.getElementById('formAlert');
    const resetBtn = document.getElementById('resetBtn');

    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');

    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    checkOutInput.setAttribute('min', today);

    checkInInput.addEventListener('change', function() {
        const checkInVal = this.value;
        if (checkInVal) {
            checkOutInput.setAttribute('min', checkInVal);
            if (checkOutInput.value && checkOutInput.value < checkInVal) {
                checkOutInput.value = '';
            }
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        alertPlaceholder.innerHTML = '';

        let isValid = true;

        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);

        if (checkIn && checkOut && checkOut <= checkIn) {
            showAlert('Check-out date must be after Check-in date.', 'warning');
            isValid = false;
        }

        if (!form.checkValidity() || !isValid) {
            form.classList.add('was-validated');
            return;
        }

        const requestBody = {
            guestName: document.getElementById('guestName').value,
            contactNumber: document.getElementById('contactNumber').value,
            address: document.getElementById('guestAddress').value,
            roomTypeId: parseInt(document.getElementById('roomType').value), // Converted to Integer
            checkInDate: document.getElementById('checkInDate').value,
            checkOutDate: document.getElementById('checkOutDate').value
        };

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';

        fetch('http://localhost:8080/oceanViewResort_war_exploded/api/v1/reception/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save booking. Server returned status: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                showAlert(`Booking Confirmed for ${requestBody.guestName}!`, 'success');
                console.log('Success:', data);

                form.reset();
                form.classList.remove('was-validated');
                checkInInput.setAttribute('min', today);
                checkOutInput.setAttribute('min', today);
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('Failed to add reservation. Please check your connection or input data.', 'danger');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
    });

    resetBtn.addEventListener('click', function() {
        form.reset();
        form.classList.remove('was-validated');
        alertPlaceholder.innerHTML = '';
        checkInInput.setAttribute('min', today);
        checkOutInput.setAttribute('min', today);
    });

    function showAlert(message, type) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
            `   <div><i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>${message}</div>`,
            `   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
            `</div>`
        ].join('');
        alertPlaceholder.append(wrapper);

        if (type === 'success') {
            setTimeout(() => {
                const closeBtn = wrapper.querySelector('.btn-close');
                if(closeBtn) {
                    closeBtn.click();
                }
            }, 3000);
        }
    }
});