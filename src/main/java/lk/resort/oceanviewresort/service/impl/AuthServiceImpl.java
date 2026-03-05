package lk.resort.oceanviewresort.service.impl;

import lk.resort.oceanviewresort.db.DBConnection;
import lk.resort.oceanviewresort.dto.LoginRequestDTO;
import lk.resort.oceanviewresort.dto.LoginResponseDTO;
import lk.resort.oceanviewresort.dto.UserDTO;
import lk.resort.oceanviewresort.service.AuthService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AuthServiceImpl implements AuthService {
    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {
        String query = "SELECT user_id, username, role FROM Users WHERE username = ? AND password_hash = ?";

        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, request.getUsername());
            stmt.setString(2, request.getPassword());
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                UserDTO user = new UserDTO(
                        rs.getInt("user_id"),
                        rs.getString("username"),
                        rs.getString("role")
                );

                String dummyToken = "eyJhbGciOiJIUzI1NiIsIn...";
                return new LoginResponseDTO("Login successful", dummyToken, user);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}

