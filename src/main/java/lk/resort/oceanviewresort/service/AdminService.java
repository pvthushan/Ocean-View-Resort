package lk.resort.oceanviewresort.service;

import lk.resort.oceanviewresort.dto.AddUserRequestDTO;
import lk.resort.oceanviewresort.dto.AddUserResponseDTO;
import lk.resort.oceanviewresort.dto.UserListResponseDTO;

public interface AdminService {
    AddUserResponseDTO addUser(AddUserRequestDTO request);
    UserListResponseDTO getAllUsers(int page, int limit);


}
