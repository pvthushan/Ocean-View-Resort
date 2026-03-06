document.addEventListener('DOMContentLoaded', function() {

    const resIdInput = document.getElementById('resIdInput');
    const generateBtn = document.getElementById('generateBtn');
    const invoiceSection = document.getElementById('invoiceSection');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const printBtn = document.getElementById('printBtn');

    const roomRates = {
        "Single AC": 5000,
        "Double AC": 8000,
        "Non-AC": 4000,
        "Ocean View Suite": 15000
    };

    const taxRate = 0.10;

    if(generateBtn) generateBtn.addEventListener('click', generateInvoice);
    if(resIdInput) {
        resIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') generateInvoice();
        });
    }

    function generateInvoice() {
        const query = resIdInput.value.trim().toUpperCase();

        if (!query) {
            alert("Please enter a Reservation ID.");
            resIdInput.focus();
            return;
        }

        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
        invoiceSection.classList.add('d-none');

        let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';
        const getUrl = window.location.origin + basePath + '/api/v1/reception/reservations/' + query;

        fetch(getUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
            .then(response => {
                if (response.status === 404) throw new Error('NOT_FOUND');
                if (!response.ok) throw new Error('SERVER_ERROR');
                return response.json();
            })
            .then(data => {
                populateInvoice(query, data);
                showInvoice();
            })
            .catch(error => {
                if (error.message === 'NOT_FOUND') {
                    alert(`Reservation ID ${query} not found.`);
                } else {
                    console.error("API Error:", error);
                    alert("Something went wrong while fetching data.");
                }
            })
            .finally(() => {
                generateBtn.disabled = false;
                generateBtn.innerHTML = 'Generate Invoice';
            });
    }

    function populateInvoice(id, data) {
        const guestName = data.guest?.name || '-';
        const roomTypeStr = data.booking?.roomType || 'Standard Room';
        const checkIn = data.booking?.checkInDate;
        const checkOut = data.booking?.checkOutDate;
        const status = data.status || 'Pending';

        const rate = roomRates[roomTypeStr] || 5000;

        let nights = 0;
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = Math.abs(end - start);
            nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
        if (nights === 0) nights = 1;

        const roomCharge = rate * nights;
        const tax = roomCharge * taxRate;
        const total = roomCharge + tax;

        document.getElementById('invoiceResId').textContent = '#' + (data.reservationId || id);
        document.getElementById('displayGuestName').textContent = guestName;
        document.getElementById('displayRoomType').textContent = roomTypeStr;
        document.getElementById('displayDates').textContent = `${formatDate(checkIn)} - ${formatDate(checkOut)}`;
        document.getElementById('displayNights').textContent = `${nights} Nights`;

        const statusBadge = document.getElementById('invoiceStatus');
        statusBadge.textContent = status;
        if(status.toLowerCase() === 'confirmed' || status.toLowerCase() === 'checked-in') {
            statusBadge.className = 'badge bg-success mt-1';
        }

        document.getElementById('displayRoomCharge').textContent = `Rs. ${roomCharge.toFixed(2)}`;
        document.getElementById('displayTax').textContent = `Rs. ${tax.toFixed(2)}`;

        animateValue(document.getElementById('displayTotal'), 0, total, 1000);
    }

    function showInvoice() {
        invoiceSection.classList.remove('d-none');
        void invoiceSection.offsetWidth;
        invoiceSection.classList.add('slide-up');
        invoiceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if(printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const method = document.getElementById('paymentMethod').value;
            const total = document.getElementById('displayTotal').textContent;
            const guest = document.getElementById('displayGuestName').textContent;

            let currentResId = document.getElementById('invoiceResId').textContent;
            currentResId = currentResId.replace('#', '').trim();

            const confirmMsg = `Confirm Checkout for ${guest}?\n\nTotal Amount: ${total}\nPayment Method: ${method}\n\nThis action cannot be undone.`;

            if (confirm(confirmMsg)) {
                checkoutBtn.disabled = true;
                checkoutBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';

                const requestBody = {
                    reservationId: currentResId,
                    paymentMethod: method
                };

                let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';

                const postUrl = window.location.origin + basePath + '/api/v1/reception/checkout';

                fetch(postUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                })
                    .then(response => {
                        if (!response.ok) throw new Error('Checkout failed');
                        return response.json();
                    })
                    .then(data => {
                        alert("Checkout Completed Successfully! Reservation updated.");
                        resIdInput.value = '';
                        invoiceSection.classList.add('d-none');
                        resIdInput.focus();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert("Failed to complete checkout. Please check the console for details.");
                    })
                    .finally(() => {
                        checkoutBtn.disabled = false;
                        checkoutBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i> Complete Checkout';
                    });
            }
        });
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = "Rs. " + (progress * (end - start) + start).toFixed(2);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});