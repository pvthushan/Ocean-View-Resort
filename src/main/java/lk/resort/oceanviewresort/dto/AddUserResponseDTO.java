package lk.resort.oceanviewresort.dto;

public class AddUserResponseDTO {
    private String message;
    private int userId;

    public AddUserResponseDTO() {
    }

    public AddUserResponseDTO(String message, int userId) {
        this.setMessage(message);
        this.setUserId(userId);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
