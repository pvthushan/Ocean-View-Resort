document.addEventListener('DOMContentLoaded', function () {

    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    if (!token || userRole !== 'Admin') {
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


    const backBtn = document.getElementById('backBtn');
    if(backBtn) {
        backBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'manageUser.jsp';
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('editId');

    if (editId) {
        document.getElementById('pageTitle').textContent = 'Update User Account';
        document.querySelector('.card-header h5').innerHTML = '<i class="bi bi-pencil-square me-2"></i>Update Details';
        document.getElementById('submitBtn').innerHTML = '<i class="bi bi-save me-2"></i> Update Account';
    }

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');

    if(togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            const icon = this.querySelector('i');
            if (type === 'text') {
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    }

    const form = document.getElementById('createUserForm');

    if(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const username = document.getElementById('usernameInput').value.trim();
            const password = document.getElementById('passwordInput').value;
            const role = document.getElementById('roleInput').value;

            if (username === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Missing Username',
                    text: 'Please enter a username.',
                    confirmButtonColor: '#0077b6'
                });
                return;
            }

            if (password === '' && !editId) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Missing Password',
                    text: 'Please enter a password.',
                    confirmButtonColor: '#0077b6'
                });
                return;
            }

            if (password !== '' && password.length < 6) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Weak Password',
                    text: 'Password must be at least 6 characters long.',
                    confirmButtonColor: '#0077b6'
                });
                return;
            }

            if (!role || role === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Missing Role',
                    text: 'Please select a user role.',
                    confirmButtonColor: '#0077b6'
                });
                return;
            }

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';

            Swal.fire({
                title: editId ? 'Updating User...' : 'Creating User...',
                text: 'Please wait',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const userData = {
                username: username,
                password: password,
                role: role
            };

            let API_URL = window.location.origin + contextPath + '/api/v1/admin/users';
            let httpMethod = 'POST';

            if (editId) {
                API_URL = API_URL + '/' + editId;
                httpMethod = 'PUT';
                if (password === '') {
                    delete userData.password;
                }
            }

            fetch(API_URL, {
                method: httpMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => {
                            throw new Error(err.error || err.message || 'Operation failed. Please try again.');
                        }).catch(() => {
                            throw new Error('Failed to process request. Please check your connection.');
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    Swal.fire({
                        icon: 'success',
                        title: editId ? 'Updated!' : 'Created!',
                        html: editId
                            ? `User account for <strong>${username}</strong> has been updated.`
                            : `User <strong>${username}</strong> has been successfully created as a ${role}.`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#4BD3E5'
                    }).then((result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            if (!editId) {
                                form.reset();
                            } else {
                                window.location.href = 'manageUser.jsp';
                            }
                        }
                    });
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: error.message,
                        confirmButtonColor: '#0077b6'
                    });
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                });
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