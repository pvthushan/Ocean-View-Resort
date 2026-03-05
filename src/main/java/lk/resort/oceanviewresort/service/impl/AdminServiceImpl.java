package lk.resort.oceanviewresort.service.impl;

import lk.resort.oceanviewresort.db.DBConnection;
import lk.resort.oceanviewresort.dto.AddUserRequestDTO;
import lk.resort.oceanviewresort.dto.AddUserResponseDTO;
import lk.resort.oceanviewresort.service.AdminService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class AdminServiceImpl implements AdminService {

    @Override
    public AddUserResponseDTO addUser(AddUserRequestDTO request) {
        String query = "INSERT INTO Users (username, password_hash, role) VALUES (?, ?, ?)";

        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, request.getUsername());
            stmt.setString(2, request.getPassword());
            stmt.setString(3, request.getRole());

            int affectedRows = stmt.executeUpdate();

            if (affectedRows > 0) {
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        int newUserId = generatedKeys.getInt(1);
                        return new AddUserResponseDTO(
                                "User " + request.getUsername() + " successfully created.",
                                newUserId
                        );
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
