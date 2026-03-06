document.addEventListener('DOMContentLoaded', function () {

    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'Manager') {
        console.warn("User is not authenticated as Manager. Bypassing for dev purposes.");
    }

    const wrapper = document.getElementById('wrapper');
    const sidebarToggle = document.getElementById('sidebarToggle');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function (e) {
            e.preventDefault();
            wrapper.classList.toggle('toggled');
        });
    }

    document.addEventListener('click', function (event) {
        if (!wrapper || !sidebarToggle) return;
        const isClickInsideSidebar = wrapper.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);

        if (window.innerWidth < 992 && wrapper.classList.contains('toggled')) {
            if (!isClickInsideSidebar && !isClickOnToggle) {
                wrapper.classList.remove('toggled');
            }
        }
    });

    const tableBody = document.getElementById('reservationTableBody');
    const searchInput = document.getElementById('searchInput');

    function loadReservations() {
        let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';
        const apiUrl = window.location.origin + basePath + '/api/v1/manager/reservations';

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const reservationsArray = data.reservations || [];
                renderTable(reservationsArray);
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
                if (tableBody) {
                    tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger py-4"><i class="bi bi-exclamation-triangle me-2"></i>Failed to load data. Please check connection.</td></tr>`;
                }
            });
    }

    function renderTable(reservations) {
        if (!tableBody) return;

        tableBody.innerHTML = '';

        if (!reservations || reservations.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No reservations found in the database.</td></tr>`;
            return;
        }

        reservations.forEach(res => {
            const id = res.reservation_id || '-';
            const name = res.guestName || '-';
            const roomName = res.roomType || '-';
            const checkIn = formatDate(res.checkIn);
            const checkOut = formatDate(res.checkOut);
            const status = res.status || 'Confirmed';

            let badgeClass = 'bg-secondary';
            if (status.toLowerCase() === 'confirmed' || status.toLowerCase() === 'completed') badgeClass = 'bg-success';
            else if (status.toLowerCase() === 'pending') badgeClass = 'bg-warning text-dark';
            else if (status.toLowerCase() === 'checked-in') badgeClass = 'bg-primary';
            else if (status.toLowerCase() === 'cancelled') badgeClass = 'bg-danger';

            const rowHtml = `
                <tr>
                    <td class="ps-4 fw-bold text-muted">${id}</td>
                    <td class="fw-semibold">${name}</td>
                    <td>${roomName}</td>
                    <td>${checkIn}</td>
                    <td>${checkOut}</td>
                    <td><span class="badge ${badgeClass} bg-opacity-75 px-3 py-2 rounded-pill">${status}</span></td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', rowHtml);
        });
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    loadReservations();

    if (searchInput && tableBody) {
        searchInput.addEventListener('keyup', function () {
            const filter = searchInput.value.toLowerCase();
            const tableRows = tableBody.querySelectorAll('tr');

            tableRows.forEach(row => {
                const guestNameCell = row.cells[1];
                if (guestNameCell) {
                    const guestName = guestNameCell.textContent.toLowerCase();
                    if (guestName.includes(filter)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const confirmLogout = confirm("Are you sure you want to logout of the Manager Portal?");
            if (confirmLogout) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userRole');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                window.location.href = 'index.jsp';
            }
        });
    }
});