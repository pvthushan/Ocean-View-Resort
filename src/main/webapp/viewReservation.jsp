<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Reservation - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/viewReservation.css">
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-ocean fixed-top shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
            <i class="bi bi-hotel me-2"></i>
            <span>Ocean View Resort <span class="fw-light opacity-75">| Reception</span></span>
        </a>
    </div>
</nav>

<div class="main-content-wrapper animate-fade-in">
    <div class="container py-5">

        <div class="row mb-4">
            <div class="col-12 d-flex align-items-center">
                <a href="receptionDashboard.jsp"
                   class="btn btn-outline-secondary btn-sm rounded-circle me-3 shadow-sm"
                   title="Back to Dashboard">
                    <i class="bi bi-arrow-left"></i>
                </a>
                <div>
                    <h2 class="fw-bold text-dark-blue mb-1">View Reservation Details</h2>
                    <p class="text-muted mb-0">Search and view detailed booking information</p>
                </div>
            </div>
        </div>

        <div class="row justify-content-center mb-5">
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-body p-4">
                        <label class="form-label fw-semibold text-muted small text-uppercase">Search by Reservation
                            ID</label>
                        <div class="input-group input-group-lg">
                                <span class="input-group-text bg-light border-end-0"><i
                                        class="bi bi-search text-muted"></i></span>
                            <input type="text" class="form-control border-start-0 ps-0" id="searchInput"
                                   placeholder="e.g. RES-9756">
                            <button class="btn btn-ocean px-4 fw-semibold" type="button" id="searchBtn">
                                Search
                            </button>
                        </div>
                        <div class="form-text">Enter the unique booking reference number to retrieve details.</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row justify-content-center d-none" id="resultsSection">
            <div class="col-lg-8">
                <div class="card border-0 shadow-lg rounded-4 overflow-hidden" id="detailsCard">

                    <div class="card-header bg-ocean text-white py-3 d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold"><i class="bi bi-receipt me-2"></i> Booking Details <span
                                id="displayResId">#RES-000</span></h5>
                        <span class="badge bg-success bg-opacity-75 border border-light px-3 py-2 rounded-pill"
                              id="statusBadge">Confirmed</span>
                    </div>

                    <div class="card-body p-4 p-md-5">

                        <div class="row g-4 mb-4">
                            <div class="col-md-6">
                                <div class="d-flex align-items-start mb-3">
                                    <div class="icon-box me-3 text-ocean">
                                        <i class="bi bi-person-fill fs-4"></i>
                                    </div>
                                    <div>
                                        <label class="d-block text-muted small text-uppercase fw-bold mb-1">Guest
                                            Name</label>
                                        <h5 class="fw-bold text-dark-blue mb-0" id="displayGuestName">-</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-start mb-3">
                                    <div class="icon-box me-3 text-ocean">
                                        <i class="bi bi-telephone-fill fs-4"></i>
                                    </div>
                                    <div>
                                        <label class="d-block text-muted small text-uppercase fw-bold mb-1">Contact
                                            Number</label>
                                        <h5 class="fw-bold text-dark-blue mb-0" id="displayContact">-</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="text-muted opacity-25 my-4">

                        <div class="row g-4">
                            <div class="col-md-4">
                                <div class="d-flex align-items-start">
                                    <div class="icon-box me-3 text-ocean">
                                        <i class="bi bi-door-open-fill fs-4"></i>
                                    </div>
                                    <div>
                                        <label class="d-block text-muted small text-uppercase fw-bold mb-1">Room
                                            Type</label>
                                        <p class="fw-semibold mb-0" id="displayRoomType">-</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="d-flex align-items-start">
                                    <div class="icon-box me-3 text-ocean">
                                        <i class="bi bi-calendar-event-fill fs-4"></i>
                                    </div>
                                    <div>
                                        <label class="d-block text-muted small text-uppercase fw-bold mb-1">Check-in</label>
                                        <p class="fw-semibold mb-0" id="displayCheckIn">-</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="d-flex align-items-start">
                                    <div class="icon-box me-3 text-ocean">
                                        <i class="bi bi-calendar-check-fill fs-4"></i>
                                    </div>
                                    <div>
                                        <label class="d-block text-muted small text-uppercase fw-bold mb-1">Check-out</label>
                                        <p class="fw-semibold mb-0" id="displayCheckOut">-</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-5">
                            <div class="col-12 d-flex gap-2 justify-content-end">
                                <button class="btn btn-outline-secondary" id="closeBtn">
                                    <i class="bi bi-x-lg me-1"></i> Close
                                </button>
                                <button class="btn btn-ocean" id="printBtn">
                                    <i class="bi bi-printer me-1"></i> Print Details
                                </button>
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

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="${pageContext.request.contextPath}/js/sweetalert-wrapper.js"></script>

<script src="${pageContext.request.contextPath}/js/viewReservation.js"></script>
</body>

</html>

