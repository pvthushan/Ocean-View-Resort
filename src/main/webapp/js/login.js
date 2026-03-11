document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const togglePasswordBtn = document.getElementById('togglePassword');

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    loginForm.addEventListener('submit', function (event) {

        event.preventDefault();
        event.stopPropagation();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please enter your username.',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        if (password === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please enter your password.',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const btn = loginForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Logging in...';
        btn.disabled = true;

        const loginData = {
            username: username,
            password: password
        };

        const base = (typeof APP_CONTEXT_PATH !== 'undefined' && APP_CONTEXT_PATH) ? APP_CONTEXT_PATH : '.';
        const API_URL = `${base}/api/v1/auth/login`;

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })

            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.error || 'Login failed. Please try again.');
                    }).catch(() => {
                        throw new Error('Invalid username or password.');
                    });
                }
                return response.json();
            })

            .then(data => {

                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userRole', data.user.role);
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('userId', data.user.user_id);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Redirecting to dashboard...',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {

                    const role = data.user.role;

                    if (role === 'Admin') {
                        window.location.href = `${base}/adminDashboard.jsp`;
                    } else if (role === 'Manager') {
                        window.location.href = `${base}/managerDashboard.jsp`;
                    } else if (role === 'Receptionist') {
                        window.location.href = `${base}/receptionDashboard.jsp`;
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Unknown role detected!',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }

                });

            })

            .catch(error => {

                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                    showConfirmButton: false,
                    timer: 2000
                });

                btn.innerHTML = originalText;
                btn.disabled = false;

            });

    });

});