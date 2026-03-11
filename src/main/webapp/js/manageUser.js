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

                Swal.fire({
                    title: 'Are you sure?',
                    text: `You are about to delete user "${username}". This action cannot be undone!`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#0077b6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {

                    if (result.isConfirmed) {
                        let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';
                        const deleteUrl = window.location.origin + basePath + `/api/v1/admin/users/${userIdText}`;

                        Swal.fire({
                            title: 'Deleting...',
                            text: 'Please wait',
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading();
                            }
                        });

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

                                }, 300);

                                Swal.fire({
                                    title: 'Deleted!',
                                    text: `User "${username}" has been deleted successfully.`,
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                    confirmButtonColor: '#4BD3E5'
                                });

                            })
                            .catch(error => {
                                console.error('Delete error:', error);

                                Swal.fire({
                                    title: 'Error!',
                                    text: error.message || 'Something went wrong. Could not delete the user.',
                                    icon: 'error',
                                    confirmButtonText: 'OK',
                                    confirmButtonColor: '#0077b6'
                                });


                            });
                    }
                });
            }
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                title: 'Ready to Leave?',
                text: 'Are you sure you want to logout of Ocean View Resort Admin Panel?',
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
});