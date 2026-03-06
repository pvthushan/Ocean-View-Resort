package lk.resort.oceanviewresort.dto;

public class ReservationDTO {
    private String reservation_id;
    private String guestName;
    private String roomType;
    private String checkIn;
    private String checkOut;
    private String status;

    public ReservationDTO() {
    }

    public ReservationDTO(String reservation_id, String guestName, String roomType, String checkIn, String checkOut, String status) {
        this.setReservation_id(reservation_id);
        this.setGuestName(guestName);
        this.setRoomType(roomType);
        this.setCheckIn(checkIn);
        this.setCheckOut(checkOut);
        this.setStatus(status);
    }

    public String getReservation_id() {
        return reservation_id;
    }

    public void setReservation_id(String reservation_id) {
        this.reservation_id = reservation_id;
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

    public String getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(String checkIn) {
        this.checkIn = checkIn;
    }

    public String getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(String checkOut) {
        this.checkOut = checkOut;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
