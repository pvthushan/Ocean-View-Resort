<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Income Report - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/incomeReport.css">
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
                    <a href="bookingRecoard.jsp" class="nav-link d-flex align-items-center"
                       data-page="reservations">
                        <i class="bi bi-calendar-event fs-5 me-3"></i>
                        <span>All Reservations</span>
                    </a>
                </li>

                <li class="nav-item mb-2">
                    <a href="incomeRepoart.jsp" class="nav-link active-link d-flex align-items-center"
                       data-page="reports">
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
                    <h2 class="fw-bold text-dark-blue">Income Report Generation</h2>
                    <p class="text-muted">Generate income reports for a selected period</p>
                </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 mb-4">
                <div class="card-body p-4">
                    <div class="row g-3 align-items-end">

                        <div class="col-md-4">
                            <label for="startDate" class="form-label fw-semibold text-secondary small">Start Date</label>
                            <div class="input-group">
                                    <span class="input-group-text bg-light border-end-0"><i
                                            class="bi bi-calendar3 text-muted"></i></span>
                                <input type="date" class="form-control border-start-0 ps-0" id="startDate">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <label for="endDate" class="form-label fw-semibold text-secondary small">End Date</label>
                            <div class="input-group">
                                    <span class="input-group-text bg-light border-end-0"><i
                                            class="bi bi-calendar3 text-muted"></i></span>
                                <input type="date" class="form-control border-start-0 ps-0" id="endDate">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <button class="btn btn-ocean w-100 py-2 fw-semibold shadow-sm" id="generateBtn">
                                <i class="bi bi-search me-2"></i> Generate Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="errorArea" class="alert alert-danger d-none" role="alert"></div>

            <div id="resultsSection" class="d-none">

                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card border-0 shadow-sm rounded-4 bg-gradient-ocean text-white">
                            <div class="card-body p-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="text-white-50 text-uppercase small fw-bold mb-1">Total Income for Period</h6>
                                    <h2 class="fw-bold mb-0 display-6">Rs. <span id="totalIncomeValue">0</span></h2>
                                </div>
                                <div class="bg-white bg-opacity-25 p-3 rounded-circle">
                                    <i class="bi bi-cash-stack fs-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold text-dark-blue">Daily Income Overview</h5>
                        <button class="btn btn-sm btn-outline-secondary" id="exportBtn">
                            <i class="bi bi-download me-1"></i> Export CSV
                        </button>
                    </div>
                    <div class="card-body p-4">
                        <div class="chart-container position-relative" style="height: 350px;">
                            <canvas id="incomeChart"></canvas>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    const contextPath = "${pageContext.request.contextPath}";
</script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="${pageContext.request.contextPath}/js/sweetalert-wrapper.js"></script>

<script src="${pageContext.request.contextPath}/js/incomeReport.js"></script>
</body>

</html>