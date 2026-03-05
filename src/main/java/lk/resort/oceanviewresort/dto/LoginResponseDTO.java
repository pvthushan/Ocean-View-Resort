package lk.resort.oceanviewresort.dto;

public class LoginResponseDTO {
    private String message;
    private String token; // දැනට dummy token එකක් යවමු, පස්සේ JWT දාන්න පුළුවන්
    private UserDTO user;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String message, String token, UserDTO user) {
        this.setMessage(message);
        this.setToken(token);
        this.setUser(user);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}

