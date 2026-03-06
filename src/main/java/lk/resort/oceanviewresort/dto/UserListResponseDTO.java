package lk.resort.oceanviewresort.dto;

import java.util.List;

public class UserListResponseDTO {
    private int totalRecords;
    private List<UserDTO> users;

    public UserListResponseDTO() {
    }

    public UserListResponseDTO(int totalRecords, List<UserDTO> users) {
        this.setTotalRecords(totalRecords);
        this.setUsers(users);
    }

    public int getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(int totalRecords) {
        this.totalRecords = totalRecords;
    }

    public List<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserDTO> users) {
        this.users = users;
    }
}

