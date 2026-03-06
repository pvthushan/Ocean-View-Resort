<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <link rel="stylesheet" href="./css/login.css">
</head>
<body>

<div class="background-overlay">

    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="card login-card shadow-lg animate-fade-in">

            <div class="card-body p-5">

                <div class="text-center mb-4">
                    <div class="logo-placeholder mb-3">
                        <i class="fa-solid fa-hotel fa-3x text-ocean"></i>
                    </div>
                    <h2 class="fw-bold text-ocean-dark">Ocean View Resort</h2>
                    <p class="text-muted small">Hotel Management System</p>
                </div>

                <div id="alertPlaceholder"></div>

                <form id="loginForm" novalidate>

                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="usernameInput" placeholder="Username">
                        <label for="usernameInput"><i class="fa-solid fa-user me-2"></i>Username</label>
                    </div>

                    <div class="form-floating mb-4 position-relative">
                        <input type="password" class="form-control" id="passwordInput" placeholder="Password">
                        <label for="passwordInput"><i class="fa-solid fa-lock me-2"></i>Password</label>

                        <span class="password-toggle" id="togglePassword">
                                <i class="fa-solid fa-eye"></i>
                            </span>
                    </div>

                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-ocean btn-lg fw-bold">
                            Login <i class="fa-solid fa-arrow-right-to-bracket ms-2"></i>
                        </button>
                    </div>

                    <div class="text-center mt-4">
                        <a href="#" class="text-decoration-none text-muted small">Forgot Password?</a>
                    </div>
                </form>
            </div>

            <div class="card-footer text-center py-3 bg-light border-0 rounded-bottom">
                <small class="text-muted">&copy; 2026 Ocean View Resort. All rights reserved.</small>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
    const APP_CONTEXT_PATH = "${pageContext.request.contextPath}";
</script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="${pageContext.request.contextPath}/js/sweetalert-wrapper.js"></script>


<script src="./js/login.js"></script>
</body>
</html>