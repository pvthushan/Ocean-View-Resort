package lk.resort.oceanviewresort.dto;

public class DeleteUserResponseDTO {
    private String message;

    public DeleteUserResponseDTO() {
    }

    public DeleteUserResponseDTO(String message) {
        this.setMessage(message);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
