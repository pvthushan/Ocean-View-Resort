package lk.resort.oceanviewresort.service;

import lk.resort.oceanviewresort.dto.LoginRequestDTO;
import lk.resort.oceanviewresort.dto.LoginResponseDTO;

public interface AuthService {
    LoginResponseDTO login(LoginRequestDTO request);
}
