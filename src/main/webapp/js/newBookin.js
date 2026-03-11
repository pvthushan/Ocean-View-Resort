document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('bookingForm');
    const resetBtn = document.getElementById('resetBtn');

    const guestNameInput = document.getElementById('guestName');
    const contactNumberInput = document.getElementById('contactNumber');
    const guestAddressInput = document.getElementById('guestAddress');
    const roomTypeInput = document.getElementById('roomType');
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

        if (guestNameInput.value.trim() === '') {
            showValidationError('Please enter the guest full name.');
            return;
        }
        if (contactNumberInput.value.trim() === '') {
            showValidationError('Please enter the contact number.');
            return;
        }
        if (guestAddressInput.value.trim() === '') {
            showValidationError('Please enter the guest address.');
            return;
        }
        if (roomTypeInput.value === '') {
            showValidationError('Please select a room type.');
            return;
        }
        if (checkInInput.value === '') {
            showValidationError('Please select a check-in date.');
            return;
        }
        if (checkOutInput.value === '') {
            showValidationError('Please select a check-out date.');
            return;
        }

        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);

        if (checkOut <= checkIn) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Dates',
                text: 'Check-out date must be after the Check-in date.',
                confirmButtonColor: '#0077b6'
            });
            return;
        }

        const requestBody = {
            guestName: guestNameInput.value.trim(),
            contactNumber: contactNumberInput.value.trim(),
            address: guestAddressInput.value.trim(),
            roomTypeId: parseInt(roomTypeInput.value),
            checkInDate: checkInInput.value,
            checkOutDate: checkOutInput.value
        };

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';

        Swal.fire({
            title: 'Processing Booking...',
            text: 'Please wait while we confirm the reservation.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';
        const API_URL = window.location.origin + basePath + '/api/v1/reception/reservations';

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.error || err.message || 'Failed to save booking.');
                    }).catch(() => {
                        throw new Error('Failed to save booking. Server error.');
                    });
                }
                return response.json();
            })
            .then(data => {
                const resId = data.reservationId || 'N/A';

                Swal.fire({
                    icon: 'success',
                    title: 'Booking Confirmed!',
                    html: `
                    <div style="text-align: left; margin-top: 15px;">
                        <p>Reservation for <strong>${requestBody.guestName}</strong> has been successfully created.</p>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #0077b6;">
                            <span style="color: #6c757d; font-size: 0.9em;">Reservation ID</span><br>
                            <strong style="font-size: 1.2em; color: #023e8a;">${resId}</strong>
                        </div>
                    </div>
                `,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#4BD3E5'
                }).then(() => {
                    form.reset();
                    form.classList.remove('was-validated');
                    checkInInput.setAttribute('min', today);
                    checkOutInput.setAttribute('min', today);
                });

            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Booking Failed',
                    text: error.message || 'Failed to add reservation. Please check your connection or input data.',
                    confirmButtonColor: '#0077b6'
                });
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
    });

    function showValidationError(message) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: message,
            confirmButtonColor: '#0077b6'
        });
    }

    resetBtn.addEventListener('click', function() {
        Swal.fire({
            title: 'Clear Form?',
            text: "Are you sure you want to clear all entered details?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0077b6',
            confirmButtonText: 'Yes, clear it!'
        }).then((result) => {
            if (result.isConfirmed) {
                form.reset();
                form.classList.remove('was-validated');
                checkInInput.setAttribute('min', today);
                checkOutInput.setAttribute('min', today);
            }
        });
    });

});