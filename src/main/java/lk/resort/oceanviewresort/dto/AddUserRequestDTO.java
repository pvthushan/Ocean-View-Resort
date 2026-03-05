package lk.resort.oceanviewresort.dto;

public class AddUserRequestDTO {
    private String username;
    private String password;
    private String role;

    public AddUserRequestDTO() {
    }

    public AddUserRequestDTO(String username, String password, String role) {
        this.setUsername(username);
        this.setPassword(password);
        this.setRole(role);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}