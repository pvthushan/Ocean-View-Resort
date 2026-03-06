document.addEventListener('DOMContentLoaded', function() {

    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'Manager') {
        console.warn("User is not authenticated as Manager. Bypassing for dev purposes.");
    }

    const wrapper = document.getElementById('wrapper');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarLinks = document.querySelectorAll('#sidebar .nav-link');

    if(sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.toggle('toggled');
        });
    }

    document.addEventListener('click', function(event) {
        if (!wrapper || !sidebarToggle) return;
        const isClickInsideSidebar = wrapper.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);

        if (window.innerWidth < 992 && wrapper.classList.contains('toggled')) {
            if (!isClickInsideSidebar && !isClickOnToggle) {
                wrapper.classList.remove('toggled');
            }
        }
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            sidebarLinks.forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            if (window.innerWidth < 992) {
                wrapper.classList.remove('toggled');
            }
        });
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
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

    function loadDashboardData() {
        let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';

        const apiUrl = window.location.origin + basePath + '/api/v1/manager/dashboard/stats';

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // 'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => {
                animateValue(document.getElementById('checkinsCounter'), 0, data.todaysCheckins || 0, 1000, '');
                animateValue(document.getElementById('availableCounter'), 0, data.availableRooms || 0, 1000, '');
                animateValue(document.getElementById('occupancyCounter'), 0, data.totalOccupancyPercentage || 0, 1000, '%');

                document.getElementById('occupancyProgressBar').style.width = (data.totalOccupancyPercentage || 0) + '%';

                renderRecentActivity(data.recentActivity || []);
            })
            .catch(error => {
                console.error("Failed to load dashboard data:", error);
                document.getElementById('checkinsCounter').innerHTML = '<span class="text-danger fs-5">Error</span>';
                document.getElementById('availableCounter').innerHTML = '<span class="text-danger fs-5">Error</span>';
                document.getElementById('occupancyCounter').innerHTML = '<span class="text-danger fs-5">Error</span>';
                document.getElementById('recentActivityTableBody').innerHTML = '<tr><td colspan="4" class="text-center text-danger">Failed to load recent activity.</td></tr>';
            });
    }

    function renderRecentActivity(activities) {
        const tbody = document.getElementById('recentActivityTableBody');
        tbody.innerHTML = '';

        if (!activities || activities.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-3">No recent activity found.</td></tr>';
            return;
        }

        activities.forEach(act => {
            const name = act.guestName || '-';
            const roomName = act.room || 'Not Assigned';
            const date = formatDate(act.date);
            const status = act.status || 'Pending';

            let badgeClass = 'bg-secondary';
            if (status.toLowerCase() === 'confirmed' || status.toLowerCase() === 'completed') badgeClass = 'bg-success';
            else if (status.toLowerCase() === 'pending') badgeClass = 'bg-warning text-dark';
            else if (status.toLowerCase() === 'checked-in') badgeClass = 'bg-primary';
            else if (status.toLowerCase() === 'cancelled') badgeClass = 'bg-danger';

            const rowHtml = `
                <tr>
                    <td class="ps-4 fw-medium">${name}</td>
                    <td>${roomName}</td>
                    <td>${date}</td>
                    <td class="pe-4"><span class="badge ${badgeClass}">${status}</span></td>
                </tr>
            `;
            tbody.insertAdjacentHTML('beforeend', rowHtml);
        });
    }

    function animateValue(obj, start, end, duration, suffix) {
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    loadDashboardData();
});