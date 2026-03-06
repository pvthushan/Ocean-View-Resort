package lk.resort.oceanviewresort.dto;

public class ViewReservationResponseDTO {
    private String reservationId;
    private String status;
    private GuestDetailsDTO guest;
    private BookingDetailsDTO booking;

    public ViewReservationResponseDTO() {
    }

    public ViewReservationResponseDTO(String reservationId, String status, GuestDetailsDTO guest, BookingDetailsDTO booking) {
        this.setReservationId(reservationId);
        this.setStatus(status);
        this.setGuest(guest);
        this.setBooking(booking);
    }

    public String getReservationId() {
        return reservationId;
    }

    public void setReservationId(String reservationId) {
        this.reservationId = reservationId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public GuestDetailsDTO getGuest() {
        return guest;
    }

    public void setGuest(GuestDetailsDTO guest) {
        this.guest = guest;
    }

    public BookingDetailsDTO getBooking() {
        return booking;
    }

    public void setBooking(BookingDetailsDTO booking) {
        this.booking = booking;
    }
}
