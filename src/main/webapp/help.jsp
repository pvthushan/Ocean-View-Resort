<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Staff Guidelines - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/help.css">
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-ocean fixed-top shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
            <i class="bi bi-hotel me-2"></i>
            <span>Ocean View Resort <span class="fw-light opacity-75">| Staff Portal</span></span>
        </a>
        <button class="btn btn-outline-light btn-sm d-print-none" onclick="window.print()">
            <i class="bi bi-printer me-1"></i> Print Guide
        </button>
    </div>
</nav>

<div class="main-content-wrapper animate-fade-in">
    <div class="container py-5">

        <div class="row mb-5">
            <div class="col-12 d-flex align-items-center">
                <a href="receptionDashboard.jsp"
                   class="btn btn-outline-secondary btn-sm rounded-circle me-3 shadow-sm"
                   title="Back to Dashboard">
                    <i class="bi bi-arrow-left"></i>
                </a>
                <div>
                    <h2 class="fw-bold text-dark-blue mb-1">Staff System Guidelines</h2>
                    <p class="text-muted mb-0">Quick reference guide for using the hotel management system</p>
                </div>
            </div>
        </div>

        <div class="row g-5">

            <div class="col-lg-3 d-none d-lg-block">
                <div class="sticky-top" style="top: 100px; z-index: 100;">
                    <h6 class="fw-bold text-uppercase text-muted small mb-3">Table of Contents</h6>
                    <nav id="sidebarNav" class="nav flex-column gap-2">
                        <a class="nav-link sidebar-link active" href="#section-reservation"><i
                                class="bi bi-calendar-plus me-2"></i> Adding Reservations</a>
                        <a class="nav-link sidebar-link" href="#section-checkout"><i
                                class="bi bi-cash-coin me-2"></i> Processing Checkout</a>
                        <a class="nav-link sidebar-link" href="#section-errors"><i
                                class="bi bi-exclamation-triangle me-2"></i> Common Errors</a>
                        <a class="nav-link sidebar-link" href="#section-tips"><i class="bi bi-lightbulb me-2"></i>
                            Best Practices</a>
                    </nav>

                    <div class="mt-4 p-3 bg-ocean-light rounded-3 border border-ocean">
                        <h6 class="fw-bold text-ocean mb-2"><i class="bi bi-headset me-2"></i> Need Help?</h6>
                        <p class="small text-muted mb-2">Contact IT Support for technical issues.</p>
                        <a href="#" class="btn btn-sm btn-ocean w-100">Contact Support</a>
                    </div>
                </div>
            </div>

            <div class="col-lg-9">
                <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div class="card-body p-4 p-md-5">

                        <div class="accordion accordion-flush" id="guidelinesAccordion">

                            <div class="accordion-item border-bottom" id="section-reservation">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button fw-bold text-ocean shadow-none" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
                                            aria-controls="collapseOne">
                                        <i class="bi bi-calendar-plus me-2"></i> How to Add a Reservation
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show"
                                     aria-labelledby="headingOne" data-bs-parent="#guidelinesAccordion">
                                    <div class="accordion-body text-muted">
                                        <p>To create a new booking for a guest, follow these steps:</p>
                                        <ol class="list-group list-group-numbered list-group-flush mb-3">
                                            <li class="list-group-item bg-transparent border-0 px-0">Navigate to the
                                                <strong>Reception Dashboard</strong> and click on <span
                                                        class="badge bg-blue text-white" style="background-color: #0077b6;">New Reservation</span>.</li>
                                            <li class="list-group-item bg-transparent border-0 px-0">Enter the
                                                <strong>Guest Full Name</strong> and <strong>Contact Number</strong>
                                                accurately.</li>
                                            <li class="list-group-item bg-transparent border-0 px-0">Select the
                                                <strong>Room Type</strong> from the dropdown menu.</li>
                                            <li class="list-group-item bg-transparent border-0 px-0">Choose the
                                                <strong>Check-in</strong> and <strong>Check-out</strong> dates using
                                                the calendar picker.</li>
                                            <li class="list-group-item bg-transparent border-0 px-0">Click
                                                <strong>Confirm Booking</strong> to finalize. A Reservation ID will
                                                be generated.</li>
                                        </ol>
                                        <div class="alert alert-info border-0 bg-ocean-light text-ocean mb-0">
                                            <i class="bi bi-info-circle me-2"></i> <strong>Note:</strong> Ensure the
                                            Check-out date is strictly after the Check-in date.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item border-bottom" id="section-checkout">
                                <h2 class="accordion-header" id="headingTwo">
                                    <button class="accordion-button collapsed fw-bold text-ocean shadow-none"
                                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                            aria-expanded="false" aria-controls="collapseTwo">
                                        <i class="bi bi-cash-coin me-2"></i> Processing a Checkout
                                    </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse"
                                     aria-labelledby="headingTwo" data-bs-parent="#guidelinesAccordion">
                                    <div class="accordion-body text-muted">
                                        <p>When a guest is ready to leave, use the Checkout module to generate the
                                            final bill.</p>
                                        <ul class="list-unstyled mb-3">
                                            <li class="mb-2"><i class="bi bi-check2 text-success me-2"></i> Go to
                                                <strong>Guest Checkout & Billing</strong> from the dashboard.</li>
                                            <li class="mb-2"><i class="bi bi-check2 text-success me-2"></i> Enter
                                                the <strong>Reservation ID</strong> provided at check-in.</li>
                                            <li class="mb-2"><i class="bi bi-check2 text-success me-2"></i> Verify
                                                the <strong>Total Amount</strong> and select the <strong>Payment
                                                    Method</strong> (Cash/Card).</li>
                                            <li class="mb-2"><i class="bi bi-check2 text-success me-2"></i> Click
                                                <strong>Complete Checkout</strong>. The room status will
                                                automatically update to "Dirty" for housekeeping.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item border-bottom" id="section-errors">
                                <h2 class="accordion-header" id="headingThree">
                                    <button class="accordion-button collapsed fw-bold text-ocean shadow-none"
                                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                            aria-expanded="false" aria-controls="collapseThree">
                                        <i class="bi bi-exclamation-triangle me-2"></i> Common Errors & Solutions
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse"
                                     aria-labelledby="headingThree" data-bs-parent="#guidelinesAccordion">
                                    <div class="accordion-body text-muted">
                                        <div class="table-responsive">
                                            <table class="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th>Error Message</th>
                                                    <th>Cause</th>
                                                    <th>Solution</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><span class="text-danger fw-semibold">"Invalid Date Range"</span>
                                                    </td>
                                                    <td>Check-out is before Check-in</td>
                                                    <td>Swap the dates in the calendar picker.</td>
                                                </tr>
                                                <tr>
                                                    <td><span class="text-danger fw-semibold">"Room Unavailable"</span></td>
                                                    <td>Room is already booked</td>
                                                    <td>Select a different room type or check availability.</td>
                                                </tr>
                                                <tr>
                                                    <td><span class="text-danger fw-semibold">"Session Expired"</span></td>
                                                    <td>Inactive for > 30 mins</td>
                                                    <td>Refresh the page and log in again.</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item" id="section-tips">
                                <h2 class="accordion-header" id="headingFour">
                                    <button class="accordion-button collapsed fw-bold text-ocean shadow-none"
                                            type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                            aria-expanded="false" aria-controls="collapseFour">
                                        <i class="bi bi-lightbulb me-2"></i> Tips & Best Practices
                                    </button>
                                </h2>
                                <div id="collapseFour" class="accordion-collapse collapse"
                                     aria-labelledby="headingFour" data-bs-parent="#guidelinesAccordion">
                                    <div class="accordion-body text-muted">
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <div class="p-3 border rounded-3 bg-light h-100">
                                                    <h6 class="fw-bold text-dark-blue"><i
                                                            class="bi bi-shield-check me-2"></i> Data Privacy</h6>
                                                    <p class="small mb-0">Never share guest credit card details or
                                                        personal addresses with unauthorized personnel.</p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="p-3 border rounded-3 bg-light h-100">
                                                    <h6 class="fw-bold text-dark-blue"><i
                                                            class="bi bi-speedometer2 me-2"></i> Speed</h6>
                                                    <p class="small mb-0">Use keyboard shortcuts (Enter key) in
                                                        search bars to speed up the check-in process during peak
                                                        hours.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="${pageContext.request.contextPath}/js/sweetalert-wrapper.js"></script>

<script src="${pageContext.request.contextPath}/js/help.js"></script>
</body>

</html>