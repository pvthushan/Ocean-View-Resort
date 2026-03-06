<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Records - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/bookingRecoard.css">
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

    </div>
</nav>

<div class="d-flex" id="wrapper" style="padding-top: 60px;">

    <div class="bg-sidebar" id="sidebar">
        <div class="sidebar-content">
            <ul class="nav flex-column mt-4">
                <li class="nav-item mb-2">
                    <a href="managerDashboard.jsp" class="nav-link d-flex align-items-center"
                       data-page="dashboard">
                        <i class="bi bi-speedometer2 fs-5 me-3"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <li class="nav-item mb-2">
                    <a href="bookingRecoard.jsp" class="nav-link active-link d-flex align-items-center"
                       data-page="reservations">
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
                    <h2 class="fw-bold text-dark-blue">All Current Booking Records</h2>
                    <p class="text-muted">Manage and monitor all active reservations</p>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-6 col-lg-4">
                    <div class="search-wrapper position-relative">
                        <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                        <input type="text" id="searchInput" class="form-control ps-5 py-2 rounded-pill shadow-sm"
                               placeholder="Search by Guest Name...">
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover align-middle mb-0" id="bookingTable">
                            <thead class="bg-light text-secondary">
                            <tr>
                                <th class="py-3 ps-4">Res ID</th>
                                <th class="py-3">Guest Name</th>
                                <th class="py-3">Room Type</th>
                                <th class="py-3">Check-in</th>
                                <th class="py-3">Check-out</th>
                                <th class="py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody id="reservationTableBody">
                            <tr>
                                <td colspan="6" class="text-center py-5">
                                    <div class="spinner-border text-primary" role="status"></div>
                                    <div class="mt-2 text-muted">Loading reservations...</div>
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

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
    const contextPath = "${pageContext.request.contextPath}";
</script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="${pageContext.request.contextPath}/js/sweetalert-wrapper.js"></script>

<script src="${pageContext.request.contextPath}/js/bookingRecoard.js"></script>
</body>

</html>

