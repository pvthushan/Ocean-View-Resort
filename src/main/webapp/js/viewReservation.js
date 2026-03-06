document.addEventListener('DOMContentLoaded', function() {

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultsSection = document.getElementById('resultsSection');
    const detailsCard = document.getElementById('detailsCard');
    const closeBtn = document.getElementById('closeBtn');
    const printBtn = document.getElementById('printBtn');

    if(searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if(searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        // ID eka gannawa (Spaces ain karala, Uppercase karala)
        const query = searchInput.value.trim().toUpperCase();

        if (!query) {
            alert("Please enter a Reservation ID.");
            searchInput.focus();
            return;
        }

        searchBtn.disabled = true;
        searchBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
        resultsSection.classList.add('d-none');

        let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';
        const apiUrl = window.location.origin + basePath + '/api/v1/reception/reservations/' + query;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 404) {
                    throw new Error('NOT_FOUND');
                }
                if (!response.ok) {
                    throw new Error('SERVER_ERROR');
                }
                return response.json();
            })
            .then(data => {
                populateCard(query, data);
                showResults();
            })
            .catch(error => {
                if (error.message === 'NOT_FOUND') {
                    alert(`Reservation ID ${query} not found. Please check the ID and try again.`);
                } else {
                    console.error("API Error:", error);
                    alert("Something went wrong while fetching data. Please check your connection or server.");
                }
                resultsSection.classList.add('d-none');
            })
            .finally(() => {
                searchBtn.disabled = false;
                searchBtn.innerHTML = 'Search';
            });
    }

    function populateCard(id, data) {
        document.getElementById('displayResId').textContent = '#' + (data.reservationId || id);

        document.getElementById('displayGuestName').textContent = data.guest?.name || '-';
        document.getElementById('displayContact').textContent = data.guest?.contact || '-';

        document.getElementById('displayRoomType').textContent = data.booking?.roomType || '-';
        document.getElementById('displayCheckIn').textContent = data.booking?.checkInDate || '-';
        document.getElementById('displayCheckOut').textContent = data.booking?.checkOutDate || '-';

        const status = data.status || 'Confirmed'; // Default fallback
        const badge = document.getElementById('statusBadge');
        badge.textContent = status;

        if (status.toLowerCase() === 'checked-in') {
            badge.className = 'badge bg-primary bg-opacity-75 border border-light px-3 py-2 rounded-pill';
        } else if (status.toLowerCase() === 'confirmed') {
            badge.className = 'badge bg-success bg-opacity-75 border border-light px-3 py-2 rounded-pill';
        } else if (status.toLowerCase() === 'cancelled') {
            badge.className = 'badge bg-danger bg-opacity-75 border border-light px-3 py-2 rounded-pill';
        } else {
            badge.className = 'badge bg-secondary bg-opacity-75 border border-light px-3 py-2 rounded-pill';
        }
    }

    function showResults() {
        resultsSection.classList.remove('d-none');
        void resultsSection.offsetWidth;
        resultsSection.classList.add('slide-up');

        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', function() {
            searchInput.value = '';
            resultsSection.classList.add('d-none');
            searchInput.focus();
        });
    }

    if(printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
});