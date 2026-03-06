package lk.resort.oceanviewresort.dto;

public class CreateReservationRequestDTO {
    private String guestName;
    private String contactNumber;
    private String address;
    private int roomTypeId;
    private String checkInDate;
    private String checkOutDate;

    public CreateReservationRequestDTO() {
    }

    public CreateReservationRequestDTO(String guestName, String contactNumber, String address, int roomTypeId, String checkInDate, String checkOutDate) {
        this.setGuestName(guestName);
        this.setContactNumber(contactNumber);
        this.setAddress(address);
        this.setRoomTypeId(roomTypeId);
        this.setCheckInDate(checkInDate);
        this.setCheckOutDate(checkOutDate);
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(int roomTypeId) {
        this.roomTypeId = roomTypeId;
    }

    public String getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(String checkOutDate) {
        this.checkOutDate = checkOutDate;
    }
}
