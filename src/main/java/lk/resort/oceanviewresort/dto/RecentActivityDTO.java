package lk.resort.oceanviewresort.dto;

public class RecentActivityDTO {
    private String guestName;
    private String room;
    private String date;
    private String status;

    public RecentActivityDTO() {
    }

    public RecentActivityDTO(String guestName, String room, String date, String status) {
        this.setGuestName(guestName);
        this.setRoom(room);
        this.setDate(date);
        this.setStatus(status);
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
