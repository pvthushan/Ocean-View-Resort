package lk.resort.oceanviewresort.service.impl;

import lk.resort.oceanviewresort.db.DBConnection;
import lk.resort.oceanviewresort.dto.*;
import lk.resort.oceanviewresort.service.ManagerService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ManagerServiceImpl implements ManagerService {
    @Override
    public DashboardStatsResponseDTO getDashboardStats() {
        int todaysCheckins = 0;
        int availableRooms = 0;
        int totalRooms = 0;
        int totalOccupancyPercentage = 0;
        List<RecentActivityDTO> recentActivities = new ArrayList<>();

        String checkinsQuery = "SELECT COUNT(*) FROM Reservations WHERE check_in_date = CURDATE() AND status IN ('Confirmed', 'Checked-in')";
        String roomsQuery = "SELECT status, COUNT(*) as count FROM Rooms GROUP BY status";
        String activityQuery = "SELECT g.full_name, r.room_number, rt.type_name, res.check_in_date, res.status " +
                "FROM Reservations res " +
                "JOIN Guests g ON res.guest_id = g.guest_id " +
                "LEFT JOIN Rooms r ON res.room_number = r.room_number " +
                "LEFT JOIN RoomTypes rt ON res.room_type_id = rt.room_type_id " +
                "ORDER BY res.created_at DESC LIMIT 5";

        try (Connection conn = DBConnection.getInstance().getConnection()) {

            try (PreparedStatement stmt = conn.prepareStatement(checkinsQuery);
                 ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    todaysCheckins = rs.getInt(1);
                }
            }

            try (PreparedStatement stmt = conn.prepareStatement(roomsQuery);
                 ResultSet rs = stmt.executeQuery()) {
                int occupiedRooms = 0;
                while (rs.next()) {
                    String status = rs.getString("status");
                    int count = rs.getInt("count");
                    totalRooms += count;

                    if ("Available".equals(status)) {
                        availableRooms = count;
                    } else if ("Occupied".equals(status)) {
                        occupiedRooms += count;
                    }
                }

                if (totalRooms > 0) {
                    totalOccupancyPercentage = (occupiedRooms * 100) / totalRooms;
                }
            }

            try (PreparedStatement stmt = conn.prepareStatement(activityQuery);
                 ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    String roomDisplay = rs.getString("room_number") != null ?
                            rs.getString("room_number") + " (" + rs.getString("type_name") + ")" :
                            "Not Assigned";

                    recentActivities.add(new RecentActivityDTO(
                            rs.getString("full_name"),
                            roomDisplay,
                            rs.getString("check_in_date"),
                            rs.getString("status")
                    ));
                }
            }

            return new DashboardStatsResponseDTO(todaysCheckins, availableRooms, totalOccupancyPercentage, recentActivities);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public ReservationListResponseDTO getAllReservations(String searchQuery) {
        List<ReservationDTO> reservationList = new ArrayList<>();

        String query = "SELECT r.reservation_code, g.full_name, rt.type_name, r.check_in_date, r.check_out_date, r.status " +
                "FROM Reservations r " +
                "JOIN Guests g ON r.guest_id = g.guest_id " +
                "JOIN RoomTypes rt ON r.room_type_id = rt.room_type_id " +
                "WHERE g.full_name LIKE ? OR r.reservation_code LIKE ? " +
                "ORDER BY r.created_at DESC";

        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {


            String searchPattern = (searchQuery != null && !searchQuery.trim().isEmpty())
                    ? "%" + searchQuery.trim() + "%"
                    : "%";

            stmt.setString(1, searchPattern);
            stmt.setString(2, searchPattern);

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                reservationList.add(new ReservationDTO(
                        rs.getString("reservation_code"),
                        rs.getString("full_name"),
                        rs.getString("type_name"),
                        rs.getString("check_in_date"),
                        rs.getString("check_out_date"),
                        rs.getString("status")
                ));
            }

            return new ReservationListResponseDTO(reservationList);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public IncomeReportResponseDTO generateIncomeReport(IncomeReportRequestDTO request) {
        double totalIncome = 0.0;
        List<DailyIncomeDTO> dailyBreakdown = new ArrayList<>();

        String query = "SELECT DATE(payment_date) as report_date, SUM(total_amount) as daily_total " +
                "FROM Invoices " +
                "WHERE payment_status = 'Paid' " +
                "AND DATE(payment_date) BETWEEN ? AND ? " +
                "GROUP BY DATE(payment_date) " +
                "ORDER BY DATE(payment_date)";

        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, request.getStartDate());
            stmt.setString(2, request.getEndDate());

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                String date = rs.getString("report_date");
                double dailyTotal = rs.getDouble("daily_total");

                dailyBreakdown.add(new DailyIncomeDTO(date, dailyTotal));

                totalIncome += dailyTotal;
            }

            return new IncomeReportResponseDTO(totalIncome, dailyBreakdown);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
