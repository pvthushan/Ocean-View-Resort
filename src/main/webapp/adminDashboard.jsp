<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/adminDashboard.css">
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

        <div class="d-flex ms-auto">
            <button class="btn btn-outline-light btn-sm rounded-pill px-3" id="logoutBtn">
                <i class="bi bi-box-arrow-right me-1"></i> Logout
            </button>
        </div>
    </div>
</nav>

<div class="d-flex" id="wrapper" style="padding-top: 60px;">

    <div class="bg-sidebar" id="sidebar">
        <div class="sidebar-content">
            <ul class="nav flex-column mt-4">
                <li class="nav-item mb-2">
                    <a href="adminDashboard.jsp" class="nav-link active-link d-flex align-items-center" data-page="dashboard">
                        <i class="bi bi-speedometer2 fs-5 me-3"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a href="manageUser.jsp" class="nav-link d-flex align-items-center" data-page="users">
                        <i class="bi bi-people fs-5 me-3"></i>
                        <span>Manage Users</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="mt-auto p-3 text-center text-white-50 small">
            &copy; 2026 Ocean View
        </div>
    </div>

    <div id="page-content-wrapper" class="w-100 animate-fade-in">
        <div class="container-fluid py-4 px-4">

            <div class="row mb-5">
                <div class="col-12">
                    <div class="card shadow-sm border-0 welcome-banner rounded-4">
                        <div class="card-body p-4 p-md-5 d-flex align-items-center w-100">
                            <div class="bg-ocean text-white rounded-circle d-flex align-items-center justify-content-center me-4 shadow-sm"
                                 style="width: 80px; height: 80px; flex-shrink: 0;">
                                <i class="bi bi-person-workspace fs-1"></i>
                            </div>
                            <div>
                                <h2 class="fw-bold mb-2 text-dark" id="welcomeHeader" style="color: #000 !important;">Welcome back, Admin!</h2>
                                <p class="mb-0 fs-5 text-muted" style="color: #333 !important;">Here is the current user summary of your system.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-4">

                <div class="col-md-6 col-xl-3">
                    <div class="card shadow-sm border-0 h-100 card-hover rounded-4">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div class="icon-box bg-ocean-light text-ocean">
                                    <i class="bi bi-people-fill fs-3"></i>
                                </div>
                            </div>
                            <h2 class="fw-bold text-dark-blue mb-1" id="totalUsersCount">
                                <span class="spinner-border spinner-border-sm text-primary"></span>
                            </h2>
                            <p class="text-muted small fw-semibold mb-0 text-uppercase">Total System Users</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-xl-3">
                    <div class="card shadow-sm border-0 h-100 card-hover rounded-4">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div class="icon-box bg-primary bg-opacity-10 text-primary">
                                    <i class="bi bi-shield-lock-fill fs-3"></i>
                                </div>
                            </div>
                            <h2 class="fw-bold text-dark-blue mb-1" id="adminCount">0</h2>
                            <p class="text-muted small fw-semibold mb-0 text-uppercase">Administrators</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-xl-3">
                    <div class="card shadow-sm border-0 h-100 card-hover rounded-4">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div class="icon-box bg-warning bg-opacity-10 text-warning">
                                    <i class="bi bi-briefcase-fill fs-3"></i>
                                </div>
                            </div>
                            <h2 class="fw-bold text-dark-blue mb-1" id="managerCount">0</h2>
                            <p class="text-muted small fw-semibold mb-0 text-uppercase">Managers</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-xl-3">
                    <div class="card shadow-sm border-0 h-100 card-hover rounded-4">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div class="icon-box bg-success bg-opacity-10 text-success">
                                    <i class="bi bi-person-badge-fill fs-3"></i>
                                </div>
                            </div>
                            <h2 class="fw-bold text-dark-blue mb-1" id="staffCount">0</h2>
                            <p class="text-muted small fw-semibold mb-0 text-uppercase">Reception Staff</p>
                        </div>
                    </div>
                </div>

            </div> </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
    const contextPath = "${pageContext.request.contextPath}";
</script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="${pageContext.request.contextPath}/js/sweetalert-wrapper.js"></script>

<script src="${pageContext.request.contextPath}/js/adminDashboard.js"></script>
</body>

</html>