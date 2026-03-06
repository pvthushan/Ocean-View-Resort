package lk.resort.oceanviewresort.service.impl;

import lk.resort.oceanviewresort.db.DBConnection;
import lk.resort.oceanviewresort.dto.AddUserRequestDTO;
import lk.resort.oceanviewresort.dto.AddUserResponseDTO;
import lk.resort.oceanviewresort.dto.UserDTO;
import lk.resort.oceanviewresort.dto.UserListResponseDTO;
import lk.resort.oceanviewresort.service.AdminService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

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

    @Override
    public UserListResponseDTO getAllUsers(int page, int limit) {
        List<UserDTO> usersList = new ArrayList<>();
        int totalRecords = 0;

        int offset = (page - 1) * limit;

        String countQuery = "SELECT COUNT(*) FROM Users";
        String dataQuery = "SELECT user_id, username, role FROM Users LIMIT ? OFFSET ?";

        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement countStmt = conn.prepareStatement(countQuery);
             PreparedStatement dataStmt = conn.prepareStatement(dataQuery)) {

            ResultSet countRs = countStmt.executeQuery();
            if (countRs.next()) {
                totalRecords = countRs.getInt(1);
            }

            dataStmt.setInt(1, limit);
            dataStmt.setInt(2, offset);
            ResultSet dataRs = dataStmt.executeQuery();

            while (dataRs.next()) {
                usersList.add(new UserDTO(
                        dataRs.getInt("user_id"),
                        dataRs.getString("username"),
                        dataRs.getString("role")
                ));
            }

            return new UserListResponseDTO(totalRecords, usersList);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
