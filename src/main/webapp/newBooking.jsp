<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking - Ocean View Resort</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/newBooking.css">
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-ocean fixed-top shadow-sm" style="background-color: #003366;">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
      <i class="bi bi-hotel me-2"></i>
      <span>Ocean View Resort <span class="fw-light opacity-75">| Reception</span></span>
    </a>
  </div>
</nav>

<div class="main-content-wrapper animate-fade-in" style="margin-top: 60px;">
  <div class="container py-5">

    <div class="row mb-4">
      <div class="col-12 d-flex align-items-center">
        <a href="receptionDashboard.jsp"
           class="btn btn-outline-secondary btn-sm rounded-circle me-3 shadow-sm"
           title="Back to Dashboard">
          <i class="bi bi-arrow-left"></i>
        </a>
        <div>
          <h2 class="fw-bold text-dark-blue mb-1">New Guest Booking Entry</h2>
          <p class="text-muted mb-0">Enter guest details to create a reservation</p>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-10 col-xl-8">
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden">

          <div class="card-header bg-white border-bottom py-3">
            <h5 class="mb-0 fw-semibold text-ocean"><i class="bi bi-pencil-square me-2"></i>Guest
              Information</h5>
          </div>

          <div class="card-body p-4 p-md-5">

            <div id="formAlert"></div>

            <form id="bookingForm" novalidate>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label for="guestName"
                         class="form-label fw-semibold small text-uppercase text-muted">Guest Full
                    Name</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light"><i class="bi bi-person"></i></span>
                    <input type="text" class="form-control" id="guestName"
                           placeholder="e.g. John Doe" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="contactNumber"
                         class="form-label fw-semibold small text-uppercase text-muted">Contact
                    Number</label>
                  <div class="input-group">
                                            <span class="input-group-text bg-light"><i
                                                    class="bi bi-telephone"></i></span>
                    <input type="tel" class="form-control" id="contactNumber"
                           placeholder="e.g. +1 234 567 890" required>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="guestAddress"
                       class="form-label fw-semibold small text-uppercase text-muted">Address</label>
                <div class="input-group">
                                        <span class="input-group-text bg-light align-items-start"><i
                                                class="bi bi-geo-alt"></i></span>
                  <textarea class="form-control" id="guestAddress" rows="3"
                            placeholder="Enter full address" required></textarea>
                </div>
              </div>

              <div class="mb-3">
                <label for="roomType"
                       class="form-label fw-semibold small text-uppercase text-muted">Room Type</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="bi bi-door-open"></i></span>
                  <select class="form-select" id="roomType" required>
                    <option selected disabled value="">Choose a room type...</option>
                    <option value="1">Single AC</option>
                    <option value="2">Double AC</option>
                    <option value="3">Non-AC</option>
                    <option value="4">Ocean View Suite</option>
                  </select>
                </div>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="checkInDate"
                         class="form-label fw-semibold small text-uppercase text-muted">Check-in
                    Date</label>
                  <div class="input-group">
                                            <span class="input-group-text bg-light"><i
                                                    class="bi bi-calendar-event"></i></span>
                    <input type="date" class="form-control" id="checkInDate" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="checkOutDate"
                         class="form-label fw-semibold small text-uppercase text-muted">Check-out
                    Date</label>
                  <div class="input-group">
                                            <span class="input-group-text bg-light"><i
                                                    class="bi bi-calendar-check"></i></span>
                    <input type="date" class="form-control" id="checkOutDate" required>
                  </div>
                </div>
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-success btn-lg fw-bold shadow-sm">
                  <i class="bi bi-check-circle me-2"></i> Confirm Booking
                </button>
                <button type="button" class="btn btn-link text-muted btn-sm" id="resetBtn">Clear
                  Form</button>
              </div>

            </form>
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

<script src="${pageContext.request.contextPath}/js/newBookin.js"></script>
</body>

</html>