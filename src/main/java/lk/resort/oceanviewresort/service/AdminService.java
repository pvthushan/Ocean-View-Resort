package lk.resort.oceanviewresort.service;

import lk.resort.oceanviewresort.dto.AddUserRequestDTO;
import lk.resort.oceanviewresort.dto.AddUserResponseDTO;

public interface AdminService {
    AddUserResponseDTO addUser(AddUserRequestDTO request);

}
