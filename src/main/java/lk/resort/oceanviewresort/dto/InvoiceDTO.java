package lk.resort.oceanviewresort.dto;

public class InvoiceDTO {
    private String reservationId;
    private String guestName;
    private String roomType;
    private String stayDuration;
    private int nights;
    private double roomCharge;
    private double taxesAndFees;
    private double totalPayable;
    private String paymentStatus;

    public InvoiceDTO() {
    }

    public InvoiceDTO(String reservationId, String guestName, String roomType, String stayDuration, int nights, double roomCharge, double taxesAndFees, double totalPayable, String paymentStatus) {
        this.setReservationId(reservationId);
        this.setGuestName(guestName);
        this.setRoomType(roomType);
        this.setStayDuration(stayDuration);
        this.setNights(nights);
        this.setRoomCharge(roomCharge);
        this.setTaxesAndFees(taxesAndFees);
        this.setTotalPayable(totalPayable);
        this.setPaymentStatus(paymentStatus);
    }

    public String getReservationId() {
        return reservationId;
    }

    public void setReservationId(String reservationId) {
        this.reservationId = reservationId;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getStayDuration() {
        return stayDuration;
    }

    public void setStayDuration(String stayDuration) {
        this.stayDuration = stayDuration;
    }

    public int getNights() {
        return nights;
    }

    public void setNights(int nights) {
        this.nights = nights;
    }

    public double getRoomCharge() {
        return roomCharge;
    }

    public void setRoomCharge(double roomCharge) {
        this.roomCharge = roomCharge;
    }

    public double getTaxesAndFees() {
        return taxesAndFees;
    }

    public void setTaxesAndFees(double taxesAndFees) {
        this.taxesAndFees = taxesAndFees;
    }

    public double getTotalPayable() {
        return totalPayable;
    }

    public void setTotalPayable(double totalPayable) {
        this.totalPayable = totalPayable;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
