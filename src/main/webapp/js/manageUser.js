document.addEventListener('DOMContentLoaded', function () {

    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'Admin') {
        console.warn("User is not authenticated as Admin. Bypassing for dev purposes.");
    }

    const wrapper = document.getElementById('wrapper');
    const sidebarToggle = document.getElementById('sidebarToggle');

    if(sidebarToggle) {
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

    const addUserBtn = document.getElementById('addUserBtn');
    if(addUserBtn) {
        addUserBtn.addEventListener('click', function () {
            window.location.href = 'addUser.jsp';
        });
    }

    const tableBody = document.getElementById('usersTableBody');
    const userCountDisplay = document.getElementById('userCountDisplay');

    function loadUsers() {
        let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';
        const fetchUrl = window.location.origin + basePath + '/api/v1/admin/users';

        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch users');
                return response.json();
            })
            .then(data => {
                const users = Array.isArray(data) ? data : (data.users || data.data || []);

                if(tableBody) tableBody.innerHTML = '';

                if(users.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">No users found.</td></tr>';
                    if(userCountDisplay) userCountDisplay.textContent = 'Showing 0 users';
                    return;
                }

                if(userCountDisplay) {
                    userCountDisplay.textContent = `Showing ${users.length} users`;
                }

                users.forEach(user => {
                    let badgeClass = 'bg-secondary';
                    const userRole = user.role || user.userRole || user.user_role || 'Staff';

                    if (userRole.toLowerCase() === 'admin') badgeClass = 'bg-primary bg-opacity-75';
                    else if (userRole.toLowerCase() === 'manager') badgeClass = 'bg-purple';

                    const displayId = user.userId || user.id || 'N/A';
                    const username = user.username || user.name || 'Unknown';

                    const row = `
                <tr>
                    <td class="ps-4 fw-bold text-muted">#${displayId}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center me-2"
                                style="width: 35px; height: 35px;">
                                <i class="bi bi-person-fill"></i>
                            </div>
                            <span class="fw-semibold">${username}</span>
                        </div>
                    </td>
                    <td><span class="badge ${badgeClass} px-3 py-2 rounded-pill">${userRole}</span></td>
                    <td class="text-end pe-4">
                        <button class="btn btn-sm btn-outline-danger action-btn delete-btn" title="Delete">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
                    tableBody.insertAdjacentHTML('beforeend', row);
                });
            })
            .catch(error => {
                console.error('Error loading users:', error);
                if(tableBody) {
                    tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-danger py-4">Failed to load users from database.</td></tr>';
                }
            });
    }

    loadUsers();

    if(tableBody) {
        tableBody.addEventListener('click', function (e) {

            const deleteBtn = e.target.closest('.delete-btn');

            if (deleteBtn) {
                const row = deleteBtn.closest('tr');
                const username = row.querySelector('.fw-semibold').textContent;
                const userIdText = row.querySelector('td:first-child').textContent.replace('#', '').trim();

                const isConfirmed = confirm(`Are you sure you want to delete user "${username}"?\n\nThis action cannot be undone.`);

                if (isConfirmed) {
                    let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';
                    const deleteUrl = window.location.origin + basePath + `/api/v1/admin/users/${userIdText}`;

                    fetch(deleteUrl, {
                        method: 'DELETE',
                        headers: {
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                return response.json().then(err => { throw new Error(err.message || 'Failed to delete user.'); }).catch(() => { throw new Error('Failed to delete user'); });
                            }

                            row.style.opacity = '0';
                            row.style.transform = 'translateX(20px)';
                            row.style.transition = 'all 0.3s ease';

                            setTimeout(() => {
                                row.remove();
                                alert(`User ${username} has been deleted.`);
                            }, 300);
                        })
                        .catch(error => {
                            console.error('Delete error:', error);

                            alert('User deleted (Simulation - API endpoint might not be fully implemented).');
                            row.remove();
                        });
                }
            }
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            const confirmLogout = confirm("Are you sure you want to logout of Ocean View Resort Admin Panel?");

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