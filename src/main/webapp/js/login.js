document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const alertPlaceholder = document.getElementById('alertPlaceholder');

    togglePasswordBtn.addEventListener('click', function() {
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

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        alertPlaceholder.innerHTML = '';

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        if (username === '') {
            showAlert('Please enter your username.', 'danger');
            isValid = false;
        } else if (password === '') {
            showAlert('Please enter your password.', 'danger');
            isValid = false;
        }

        if (isValid) {
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
                    showAlert('Login Successful! Redirecting...', 'success');

                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userRole', data.user.role);
                    localStorage.setItem('username', data.user.username);
                    localStorage.setItem('userId', data.user.user_id);

                    setTimeout(() => {
                        const role = data.user.role;

                        if (role === 'Admin') {
                            window.location.href = `${base}/adminDashboard.jsp`;
                        } else if (role === 'Manager') {
                            window.location.href = `${base}/managerDashboard.jsp`;
                        } else if (role === 'Receptionist') {
                            window.location.href = `${base}/receptionDashboard.jsp`;
                        } else {
                            showAlert('Unknown role detected!', 'danger');
                            btn.innerHTML = originalText;
                            btn.disabled = false;
                        }
                    }, 1000);
                })
                .catch(error => {
                    showAlert(error.message, 'danger');

                    btn.innerHTML = originalText;
                    btn.disabled = false;
                });
        }
    });

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
});