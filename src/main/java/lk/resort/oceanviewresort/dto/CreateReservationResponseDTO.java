package lk.resort.oceanviewresort.dto;

public class CreateReservationResponseDTO {
    private String message;
    private String reservationId;
    private String status;

    public CreateReservationResponseDTO() {
    }

    public CreateReservationResponseDTO(String message, String reservationId, String status) {
        this.setMessage(message);
        this.setReservationId(reservationId);
        this.setStatus(status);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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
}
