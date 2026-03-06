<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout & Billing - Ocean View Resort</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/bill.css">
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
                    <h2 class="fw-bold text-dark-blue mb-1">Guest Checkout & Billing</h2>
                    <p class="text-muted mb-0">Enter reservation ID to generate invoice and complete checkout</p>
                </div>
            </div>
        </div>

        <div class="row justify-content-center mb-5">
            <div class="col-lg-6">
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-body p-4">
                        <label for="resIdInput"
                               class="form-label fw-semibold text-muted small text-uppercase">Reservation ID for Checkout</label>
                        <div class="input-group input-group-lg">
                            <span class="input-group-text bg-light border-end-0"><i class="bi bi-hash text-muted"></i></span>
                            <input type="text" class="form-control border-start-0 ps-0" id="resIdInput" placeholder="e.g. RES-1001">
                            <button class="btn btn-ocean px-4 fw-semibold" type="button" id="generateBtn">
                                Generate Invoice
                            </button>
                        </div>
                        <div class="form-text">Enter the booking reference to retrieve billing details.</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row justify-content-center d-none" id="invoiceSection">
            <div class="col-lg-8">
                <div class="card border-0 shadow-lg rounded-4 overflow-hidden" id="invoiceCard">

                    <div class="card-header bg-white border-bottom py-4">
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <h4 class="fw-bold text-ocean mb-0"><i class="bi bi-receipt me-2"></i>Invoice</h4>
                                <small class="text-muted">Ocean View Resort</small>
                            </div>
                            <div class="col-md-6 text-md-end mt-2 mt-md-0">
                                <h5 class="fw-bold text-dark-blue mb-0" id="invoiceResId">#RES-000</h5>
                                <span class="badge bg-warning mt-1" id="invoiceStatus">Pending</span>
                            </div>
                        </div>
                    </div>

                    <div class="card-body p-4 p-md-5">

                        <div class="row mb-4">
                            <div class="col-md-6">
                                <h6 class="text-muted text-uppercase small fw-bold mb-2">Billed To</h6>
                                <h5 class="fw-bold text-dark-blue" id="displayGuestName">-</h5>
                                <p class="text-muted mb-0" id="displayRoomType">-</p>
                            </div>
                            <div class="col-md-6 text-md-end">
                                <h6 class="text-muted text-uppercase small fw-bold mb-2">Stay Duration</h6>
                                <div class="d-flex justify-content-md-end align-items-center mb-1">
                                    <i class="bi bi-calendar-event me-2 text-ocean"></i>
                                    <span class="fw-semibold" id="displayDates">-</span>
                                </div>
                                <div class="d-flex justify-content-md-end align-items-center">
                                    <i class="bi bi-clock me-2 text-ocean"></i>
                                    <span class="fw-semibold" id="displayNights">0 Nights</span>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive mb-4">
                            <table class="table table-borderless">
                                <thead class="bg-light">
                                <tr>
                                    <th class="py-2 rounded-start">Description</th>
                                    <th class="py-2 text-end">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="py-3">
                                        <span class="fw-semibold">Room Charge</span>
                                        <div class="small text-muted">Daily Rate x Nights</div>
                                    </td>
                                    <td class="py-3 text-end fw-semibold" id="displayRoomCharge">$0.00</td>
                                </tr>
                                <tr>
                                    <td class="py-3">
                                        <span class="fw-semibold">Taxes & Fees</span>
                                        <div class="small text-muted">10% Service Tax</div>
                                    </td>
                                    <td class="py-3 text-end fw-semibold" id="displayTax">$0.00</td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr class="border-top">
                                    <td class="pt-3">
                                        <h5 class="fw-bold text-dark-blue mb-0">Total Payable</h5>
                                    </td>
                                    <td class="pt-3 text-end">
                                        <h3 class="fw-bold text-success mb-0" id="displayTotal">$0.00</h3>
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div class="mb-4">
                            <label class="form-label fw-semibold small text-uppercase text-muted">Payment Method</label>
                            <select class="form-select" id="paymentMethod">
                                <option value="Cash">Cash</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Online Transfer">Online Transfer</option>
                            </select>
                        </div>

                        <div class="row g-3">
                            <div class="col-md-6">
                                <button class="btn btn-outline-secondary w-100 py-2 fw-semibold" id="printBtn">
                                    <i class="bi bi-printer me-2"></i> Print Receipt
                                </button>
                            </div>
                            <div class="col-md-6">
                                <button class="btn btn-success w-100 py-2 fw-bold shadow-sm" id="checkoutBtn">
                                    <i class="bi bi-check-circle me-2"></i> Complete Checkout
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

<script src="${pageContext.request.contextPath}/js/bill.js"></script>
</body>

</html>

