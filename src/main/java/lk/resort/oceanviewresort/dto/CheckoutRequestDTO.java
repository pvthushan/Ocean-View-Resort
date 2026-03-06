package lk.resort.oceanviewresort.dto;

public class CheckoutRequestDTO {
    private String reservationId;
    private String paymentMethod;

    public CheckoutRequestDTO() {
    }

    public CheckoutRequestDTO(String reservationId, String paymentMethod) {
        this.setReservationId(reservationId);
        this.setPaymentMethod(paymentMethod);
    }

    public String getReservationId() {
        return reservationId;
    }

    public void setReservationId(String reservationId) {
        this.reservationId = reservationId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
