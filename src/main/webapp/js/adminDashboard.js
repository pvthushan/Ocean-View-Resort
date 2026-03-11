document.addEventListener('DOMContentLoaded', function() {

    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');

    if (!token || role !== 'Admin') {
        console.warn("User is not authenticated as Admin. Bypassing for dev purposes.");
    }

    const welcomeHeader = document.getElementById('welcomeHeader');
    if (welcomeHeader && username) {
        const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        welcomeHeader.textContent = `Welcome back, ${capitalizedUsername}!`;
    }

    const wrapper = document.getElementById('wrapper');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const logoutBtn = document.getElementById('logoutBtn');

    if (sidebarToggle) {
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

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();

            Swal.fire({
                title: 'Ready to Leave?',
                text: 'Are you sure you want to logout of the Ocean View Resort Admin Panel?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#0077b6',
                confirmButtonText: 'Yes, Logout'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('username');
                    localStorage.removeItem('userId');

                    Swal.fire({
                        icon: 'success',
                        title: 'Logged Out',
                        text: 'You have been successfully logged out.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = 'index.jsp';
                    });
                }
            });
        });
    }

    function loadAdminDashboard() {
        let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';
        const apiUrl = window.location.origin + basePath + '/api/v1/admin/users';

        console.log("Fetching data from API:", apiUrl);

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("API call failed with HTTP Status: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log("Success! Data received:", data);

                const users = Array.isArray(data) ? data : (data.users || data.data || []);

                let total = users.length;
                let adminsCount = 0;
                let managersCount = 0;
                let staffCount = 0;

                users.forEach(user => {
                    const userRole = (user.role || user.userRole || user.user_role || '').toLowerCase();

                    if (userRole === 'admin') {
                        adminsCount++;
                    } else if (userRole === 'manager') {
                        managersCount++;
                    } else {
                        staffCount++;
                    }
                });

                animateValue(document.getElementById('totalUsersCount'), 0, total, 800);
                animateValue(document.getElementById('adminCount'), 0, adminsCount, 800);
                animateValue(document.getElementById('managerCount'), 0, managersCount, 800);
                animateValue(document.getElementById('staffCount'), 0, staffCount, 800);
            })
            .catch(error => {
                console.error("API Fetch Error Details:", error);

                const totalUsersElement = document.getElementById('totalUsersCount');
                if(totalUsersElement) totalUsersElement.innerHTML = '<span class="text-danger fs-5">Error</span>';

                Swal.fire({
                    icon: 'error',
                    title: 'Data Load Failed',
                    text: 'Could not fetch user statistics from the database. Please check your connection.',
                    confirmButtonColor: '#0077b6'
                });
            });
    }

    function animateValue(obj, start, end, duration) {
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    loadAdminDashboard();
});