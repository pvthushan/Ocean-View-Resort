<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manager Portal - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/managerDashboard.css">
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-ocean fixed-top shadow-sm">
    <div class="container-fluid">
        <button class="btn btn-link text-white d-lg-none me-2" id="sidebarToggle">
            <i class="bi bi-list fs-4"></i>
        </button>

        <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
            <i class="bi bi-hotel me-2"></i>
            <span>Ocean View Resort <span class="fw-light opacity-75">| Manager Portal</span></span>
        </a>

        <div class="d-flex ms-auto">
            <button class="btn btn-outline-light btn-sm rounded-pill px-3" id="logoutBtn">
                <i class="bi bi-box-arrow-right me-1"></i> Logout
            </button>
        </div>
    </div>
</nav>

<div class="d-flex" id="wrapper">

    <div class="bg-sidebar" id="sidebar">
        <div class="sidebar-content">
            <ul class="nav flex-column mt-4">
                <li class="nav-item mb-2">
                    <a href="managerDashboard.jsp" class="nav-link active-link d-flex align-items-center" data-page="dashboard">
                        <i class="bi bi-speedometer2 fs-5 me-3"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a href="bookingRecoard.jsp" class="nav-link d-flex align-items-center" data-page="reservations">
                        <i class="bi bi-calendar-event fs-5 me-3"></i>
                        <span>All Reservations</span>
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a href="incomeRepoart.jsp" class="nav-link d-flex align-items-center" data-page="reports">
                        <i class="bi bi-bar-chart-line fs-5 me-3"></i>
                        <span>Reports</span>
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

            <div class="row mb-4">
                <div class="col-12">
                    <h2 class="fw-bold text-dark-blue">Manager Dashboard</h2>
                    <p class="text-muted">Operational Overview</p>
                </div>
            </div>

            <div class="row g-4">

                <div class="col-md-6 col-lg-4">
                    <div class="card stat-card border-0 h-100 shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <p class="text-muted text-uppercase small fw-bold mb-1">Today's Check-ins</p>
                                    <h2 class="fw-bold text-dark-blue mb-0" id="checkinsCounter">
                                        <span class="spinner-border spinner-border-sm text-primary"></span>
                                    </h2>
                                </div>
                                <div class="icon-box bg-light-blue text-ocean">
                                    <i class="bi bi-calendar-check fs-3"></i>
                                </div>
                            </div>
                            <div class="mt-3">
                                    <span class="badge bg-success bg-opacity-10 text-success small">
                                        <i class="bi bi-activity"></i> Live Data
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-4">
                    <div class="card stat-card border-0 h-100 shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <p class="text-muted text-uppercase small fw-bold mb-1">Available Rooms</p>
                                    <h2 class="fw-bold text-success mb-0" id="availableCounter">
                                        <span class="spinner-border spinner-border-sm text-success"></span>
                                    </h2>
                                </div>
                                <div class="icon-box bg-light-green text-success">
                                    <i class="bi bi-door-open fs-3"></i>
                                </div>
                            </div>
                            <div class="mt-3">
                                <span class="text-muted small">Out of 50 total rooms</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-4">
                    <div class="card stat-card border-0 h-100 shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <p class="text-muted text-uppercase small fw-bold mb-1">Total Occupancy</p>
                                    <h2 class="fw-bold text-warning mb-0" id="occupancyCounter">
                                        <span class="spinner-border spinner-border-sm text-warning"></span>
                                    </h2>
                                </div>
                                <div class="icon-box bg-light-orange text-warning">
                                    <i class="bi bi-pie-chart fs-3"></i>
                                </div>
                            </div>
                            <div class="mt-3">
                                <div class="progress" style="height: 6px;">
                                    <div class="progress-bar bg-warning" id="occupancyProgressBar" role="progressbar" style="width: 0%; transition: width 1s ease-in-out;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row mt-5">
                <div class="col-12">
                    <h5 class="fw-bold text-dark-blue mb-3 ps-1">Recent Activity</h5>

                    <div class="card border-0 shadow-sm rounded-4">
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-hover align-middle mb-0">
                                    <thead class="bg-light">
                                    <tr>
                                        <th class="ps-4 py-3">Guest Name</th>
                                        <th class="py-3">Room</th>
                                        <th class="py-3">Check-in Date</th>
                                        <th class="py-3 pe-4">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody id="recentActivityTableBody">
                                    <tr>
                                        <td colspan="4" class="text-center py-4 text-muted">
                                            <span class="spinner-border spinner-border-sm text-primary me-2"></span> Loading recent activity...
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
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

<!-- SweetAlert2 (for nicer alerts) -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="${pageContext.request.contextPath}/js/sweetalert-wrapper.js"></script>

<script src="${pageContext.request.contextPath}/js/managerDashboard.js"></script>
</body>
</html>

