<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create User - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/addUser.css">
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-ocean fixed-top shadow-sm">
    <div class="container-fluid">
        <button class="btn btn-link text-white d-lg-none me-2" id="sidebarToggle">
            <i class="bi bi-list fs-4"></i>
        </button>

        <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
            <i class="bi bi-hotel me-2"></i>
            <span>Ocean View Resort <span class="fw-light opacity-75">| Admin Panel</span></span>
        </a>
    </div>
</nav>

<div class="d-flex" id="wrapper" style="padding-top: 60px;">

    <div class="bg-sidebar" id="sidebar">
        <div class="sidebar-content">
            <ul class="nav flex-column mt-4">
                <li class="nav-item mb-2">
                    <a href="adminDashboard.jsp" class="nav-link d-flex align-items-center">
                        <i class="bi bi-speedometer2 fs-5 me-3"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a href="manageUser.jsp" class="nav-link active-link d-flex align-items-center">
                        <i class="bi bi-people fs-5 me-3"></i>
                        <span>Manage Users</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <div id="page-content-wrapper" class="w-100 animate-fade-in">
        <div class="container-fluid py-4 px-4">

            <div class="d-flex align-items-center mb-4">
                <a href="manageUser.jsp" class="btn btn-outline-secondary btn-sm me-3 rounded-circle" id="backBtn"
                   title="Go Back">
                    <i class="bi bi-arrow-left"></i>
                </a>
                <div>
                    <h2 class="fw-bold text-dark-blue mb-0" id="pageTitle">Create New User Account</h2>
                    <p class="text-muted small mb-0">Add a new staff member to the system</p>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-8 col-xl-6">
                    <div class="card border-0 shadow-lg rounded-4 overflow-hidden">

                        <div class="card-header bg-white border-bottom py-3">
                            <h5 class="mb-0 fw-semibold text-ocean"><i
                                    class="bi bi-person-plus-fill me-2"></i>Account Details</h5>
                        </div>

                        <div class="card-body p-4 p-md-5">

                            <div id="formAlert"></div>

                            <form id="createUserForm" novalidate>

                                <div class="form-floating mb-4">
                                    <input type="text" class="form-control" id="usernameInput"
                                           placeholder="Enter Username" required>
                                    <label for="usernameInput"><i
                                            class="bi bi-person me-2 text-muted"></i>Username</label>
                                </div>

                                <div class="form-floating mb-4 position-relative">
                                    <input type="password" class="form-control" id="passwordInput"
                                           placeholder="Enter Password" required>
                                    <label for="passwordInput"><i
                                            class="bi bi-lock me-2 text-muted"></i>Password</label>

                                    <span class="password-toggle" id="togglePassword">
                                            <i class="bi bi-eye"></i>
                                        </span>
                                </div>

                                <div class="form-floating mb-4">
                                    <select class="form-select" id="roleInput" aria-label="Select Role" required>
                                        <option selected disabled value="">Select a role...</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Receptionist">Receptionist</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                    <label for="roleInput"><i class="bi bi-briefcase me-2 text-muted"></i>Select
                                        Role</label>
                                </div>

                                <div class="d-grid gap-2 mt-5">
                                    <button type="submit" class="btn btn-ocean btn-lg fw-bold shadow-sm" id="submitBtn">
                                        <i class="bi bi-check-circle me-2"></i> Create Account
                                    </button>
                                </div>

                                <div class="text-center mt-3">
                                    <small class="text-muted">All fields are required.</small>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
    const contextPath = "${pageContext.request.contextPath}";
</script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="${pageContext.request.contextPath}/js/sweetalert-wrapper.js"></script>

<script src="${pageContext.request.contextPath}/js/addUser.js"></script>
</body>
</html>