<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reception Dashboard - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/receptionDashboard.css">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-ocean fixed-top shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
            <i class="bi bi-hotel me-2"></i>
            <span>Ocean View Resort <span class="fw-light opacity-75">| Reception</span></span>
        </a>

        <div class="d-flex ms-auto">
            <button class="btn btn-outline-light btn-sm rounded-pill px-3" id="logoutBtn">
                <i class="bi bi-box-arrow-right me-1"></i> Logout
            </button>
        </div>
    </div>
</nav>

<div class="main-content-wrapper animate-fade-in">
    <div class="container py-5">

        <div class="row mb-5 text-center">
            <div class="col-lg-8 mx-auto">
                <h1 class="fw-bold text-dark-blue mb-3">Welcome to Reception Dashboard</h1>
                <p class="text-muted lead">Select an action below to manage guest services efficiently.</p>
            </div>
        </div>

        <div class="row g-4 justify-content-center">

            <div class="col-12 col-md-6 col-lg-3">
                <div class="action-card card-blue h-100" onclick="handleAction('New Reservation')">
                    <div class="card-body text-center p-4">
                        <div class="icon-wrapper bg-blue-light text-blue mb-3">
                            <i class="bi bi-plus-lg fs-1"></i>
                        </div>
                        <h3 class="h5 fw-bold mb-2">New Reservation</h3>
                        <p class="text-muted small mb-0">Create a new guest booking</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-3">
                <div class="action-card card-green h-100" onclick="handleAction('Find Reservation')">
                    <div class="card-body text-center p-4">
                        <div class="icon-wrapper bg-green-light text-green mb-3">
                            <i class="bi bi-search fs-1"></i>
                        </div>
                        <h3 class="h5 fw-bold mb-2">Find Reservation</h3>
                        <p class="text-muted small mb-0">Search existing bookings</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-3">
                <div class="action-card card-orange h-100" onclick="handleAction('Guest Checkout')">
                    <div class="card-body text-center p-4">
                        <div class="icon-wrapper bg-orange-light text-orange mb-3">
                            <i class="bi bi-calculator fs-1"></i>
                        </div>
                        <h3 class="h5 fw-bold mb-2">Guest Checkout</h3>
                        <p class="text-muted small mb-0">Process payments & bill</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-3">
                <div class="action-card card-purple h-100" onclick="handleAction('Help Guidelines')">
                    <div class="card-body text-center p-4">
                        <div class="icon-wrapper bg-purple-light text-purple mb-3">
                            <i class="bi bi-question-circle fs-1"></i>
                        </div>
                        <h3 class="h5 fw-bold mb-2">Help Guidelines</h3>
                        <p class="text-muted small mb-0">View system instructions</p>
                    </div>
                </div>
            </div>

        </div>

        <div class="row mt-5 pt-4 border-top">
            <div class="col-12 text-center text-muted small">
                <p class="mb-0">System Status: <span class="text-success fw-bold">● Online</span> | Current Shift: <span id="currentShiftDisplay" class="fw-bold text-dark">Loading...</span></p>
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

<script src="${pageContext.request.contextPath}/js/receptionDashboard.js"></script>
</body>
</html>