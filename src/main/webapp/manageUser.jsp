<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Users - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/manageUser.css">
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
        <div class="mt-auto p-3 text-center text-white-50 small">
            &copy; 2026 Ocean View
        </div>
    </div>

    <div id="page-content-wrapper" class="w-100 animate-fade-in">
        <div class="container-fluid py-4 px-4">

            <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <h2 class="fw-bold text-dark-blue mb-0">Manage System Users</h2>
                    <p class="text-muted small mb-0">View and manage staff access levels</p>
                </div>
                <button class="btn btn-success btn-lg shadow-sm" id="addUserBtn">
                    <i class="bi bi-plus-lg me-1"></i> Add New User
                </button>
            </div>

            <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover table-striped align-middle mb-0" id="usersTable">
                            <thead class="bg-light text-secondary">
                            <tr>
                                <th class="py-3 ps-4">ID</th>
                                <th class="py-3">Username</th>
                                <th class="py-3">Role</th>
                                <th class="py-3 text-end pe-4">Actions</th>
                            </tr>
                            </thead>
                            <tbody id="usersTableBody">
                            <tr>
                                <td colspan="4" class="text-center py-5">
                                    <div class="spinner-border text-primary" role="status"></div>
                                    <div class="mt-2 text-muted">Loading users...</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer bg-white border-0 py-3 text-center">
                    <%--                    <small class="text-muted fw-medium" id="userCountDisplay">Loading users...</small>--%>
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

<script src="${pageContext.request.contextPath}/js/manageUser.js"></script>
</body>
</html>