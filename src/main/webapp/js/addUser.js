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
    const alertPlaceholder = document.getElementById('formAlert');

    if(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            alertPlaceholder.innerHTML = '';

            const username = document.getElementById('usernameInput').value.trim();
            const password = document.getElementById('passwordInput').value;
            const role = document.getElementById('roleInput').value;

            let isValid = true;

            if (username === '') {
                showAlert('Please enter a username.', 'warning');
                isValid = false;
            } else if (password === '' && !editId) {
                showAlert('Please enter a password.', 'warning');
                isValid = false;
            } else if (password !== '' && password.length < 6) {
                showAlert('Password must be at least 6 characters long.', 'warning');
                isValid = false;
            } else if (!role || role === '') {
                showAlert('Please select a user role.', 'warning');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                const originalText = submitBtn.innerHTML;

                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';

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

                const headers = {
                    'Content-Type': 'application/json'
                };
                if (token) headers['Authorization'] = `Bearer ${token}`;

                fetch(API_URL, {
                    method: httpMethod,
                    headers: headers,
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
                        if (editId) {
                            showAlert(`Success! User account for <strong>${username}</strong> has been updated.`, 'success');
                        } else {
                            showAlert(`Success! User <strong>${username}</strong> has been created as a ${role}.`, 'success');
                            form.reset();
                        }
                    })
                    .catch(error => {
                        showAlert(error.message, 'danger');
                    })
                    .finally(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    });
            }
        });
    }

    function showAlert(message, type) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
            `   <div>${message}</div>`,
            `   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
            `</div>`
        ].join('');
        alertPlaceholder.append(wrapper);
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