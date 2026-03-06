package lk.resort.oceanviewresort.service.impl;

import lk.resort.oceanviewresort.db.DBConnection;
import lk.resort.oceanviewresort.dto.*;
import lk.resort.oceanviewresort.service.ReceptionService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;


public class ReceptionServiceImpl implements ReceptionService {


    @Override
    public CreateReservationResponseDTO createReservation(CreateReservationRequestDTO req) {
        Connection conn = null;
        try {
            conn = DBConnection.getInstance().getConnection();

            conn.setAutoCommit(false);

            String guestQuery = "INSERT INTO Guests (full_name, contact_number, address) VALUES (?, ?, ?)";
            int guestId = 0;
            try (PreparedStatement guestStmt = conn.prepareStatement(guestQuery, Statement.RETURN_GENERATED_KEYS)) {
                guestStmt.setString(1, req.getGuestName());
                guestStmt.setString(2, req.getContactNumber());
                guestStmt.setString(3, req.getAddress());
                guestStmt.executeUpdate();

                ResultSet rs = guestStmt.getGeneratedKeys();
                if (rs.next()) guestId = rs.getInt(1);
            }

            String priceQuery = "SELECT base_price_per_night FROM RoomTypes WHERE room_type_id = ?";
            double bookedPrice = 0.0;
            try (PreparedStatement priceStmt = conn.prepareStatement(priceQuery)) {
                priceStmt.setInt(1, req.getRoomTypeId());
                ResultSet rs = priceStmt.executeQuery();
                if (rs.next()) bookedPrice = rs.getDouble("base_price_per_night");
            }

            String resCode = "RES-" + System.currentTimeMillis() % 100000;

            String resQuery = "INSERT INTO Reservations (reservation_code, guest_id, user_id, room_type_id, booked_price, check_in_date, check_out_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement resStmt = conn.prepareStatement(resQuery)) {
                resStmt.setString(1, resCode);
                resStmt.setInt(2, guestId);
                resStmt.setInt(3, 1); // Hardcoded user_id for now
                resStmt.setInt(4, req.getRoomTypeId());
                resStmt.setDouble(5, bookedPrice);
                resStmt.setString(6, req.getCheckInDate());
                resStmt.setString(7, req.getCheckOutDate());
                resStmt.setString(8, "Confirmed");
                resStmt.executeUpdate();
            }

            conn.commit();

            return new CreateReservationResponseDTO("Reservation created successfully.", resCode, "Confirmed");

        } catch (Exception e) {
            e.printStackTrace();
            try {
                if (conn != null) conn.rollback();
            } catch (Exception rollbackEx) {
                rollbackEx.printStackTrace();
            }
        } finally {
            try {
                if (conn != null) conn.setAutoCommit(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public ViewReservationResponseDTO getReservationDetails(String reservationId) {
        String query = "SELECT r.reservation_code, r.status, g.full_name, g.contact_number, " +
                "rt.type_name, r.check_in_date, r.check_out_date " +
                "FROM Reservations r " +
                "JOIN Guests g ON r.guest_id = g.guest_id " +
                "JOIN RoomTypes rt ON r.room_type_id = rt.room_type_id " +
                "WHERE r.reservation_code = ?";

        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, reservationId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                GuestDetailsDTO guest = new GuestDetailsDTO(
                        rs.getString("full_name"),
                        rs.getString("contact_number")
                );

                BookingDetailsDTO booking = new BookingDetailsDTO(
                        rs.getString("type_name"),
                        rs.getString("check_in_date"),
                        rs.getString("check_out_date")
                );

                return new ViewReservationResponseDTO(
                        rs.getString("reservation_code"),
                        rs.getString("status"),
                        guest,
                        booking
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public CheckoutResponseDTO processCheckout(CheckoutRequestDTO request) {
        Connection conn = null;
        try {
            conn = DBConnection.getInstance().getConnection();
            conn.setAutoCommit(false);

            String selectQuery = "SELECT r.reservation_id, r.reservation_code, g.full_name, rt.type_name, " +
                    "r.check_in_date, r.check_out_date, r.booked_price, r.room_number " +
                    "FROM Reservations r " +
                    "JOIN Guests g ON r.guest_id = g.guest_id " +
                    "JOIN RoomTypes rt ON r.room_type_id = rt.room_type_id " +
                    "WHERE r.reservation_code = ? AND r.status NOT IN ('Completed', 'Cancelled')";

            int internalResId = 0;
            String guestName = "", roomType = "", roomNumber = "";
            LocalDate checkIn = null, checkOut = null;
            double bookedPrice = 0.0;

            try (PreparedStatement stmt = conn.prepareStatement(selectQuery)) {
                stmt.setString(1, request.getReservationId());
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    internalResId = rs.getInt("reservation_id");
                    guestName = rs.getString("full_name");
                    roomType = rs.getString("type_name");
                    roomNumber = rs.getString("room_number");
                    bookedPrice = rs.getDouble("booked_price");
                    checkIn = rs.getDate("check_in_date").toLocalDate();
                    checkOut = rs.getDate("check_out_date").toLocalDate();
                } else {
                    return null;
                }
            }

            int nights = (int) ChronoUnit.DAYS.between(checkIn, checkOut);
            if (nights <= 0) nights = 1;

            double roomCharge = nights * bookedPrice;
            double taxesAndFees = roomCharge * 0.10;
            double totalPayable = roomCharge + taxesAndFees;

            String insertInvoice = "INSERT INTO Invoices (reservation_id, room_charge, taxes_and_fees, total_amount, payment_method, payment_status) VALUES (?, ?, ?, ?, ?, 'Paid')";
            try (PreparedStatement stmt = conn.prepareStatement(insertInvoice)) {
                stmt.setInt(1, internalResId);
                stmt.setDouble(2, roomCharge);
                stmt.setDouble(3, taxesAndFees);
                stmt.setDouble(4, totalPayable);
                stmt.setString(5, request.getPaymentMethod());
                stmt.executeUpdate();
            }

            String updateReservation = "UPDATE Reservations SET status = 'Completed' WHERE reservation_id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(updateReservation)) {
                stmt.setInt(1, internalResId);
                stmt.executeUpdate();
            }

            if (roomNumber != null && !roomNumber.isEmpty()) {
                String updateRoom = "UPDATE Rooms SET status = 'Dirty' WHERE room_number = ?";
                try (PreparedStatement stmt = conn.prepareStatement(updateRoom)) {
                    stmt.setString(1, roomNumber);
                    stmt.executeUpdate();
                }
            }

            conn.commit();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd");
            String stayDuration = checkIn.format(formatter) + " - " + checkOut.format(formatter);

            InvoiceDTO invoice = new InvoiceDTO(
                    request.getReservationId(), guestName, roomType, stayDuration, nights,
                    roomCharge, taxesAndFees, totalPayable, "Paid"
            );

            return new CheckoutResponseDTO("Checkout completed successfully.", invoice);

        } catch (Exception e) {
            e.printStackTrace();
            try {
                if (conn != null) conn.rollback();
            } catch (Exception rollbackEx) {
                rollbackEx.printStackTrace();
            }
        } finally {
            try {
                if (conn != null) conn.setAutoCommit(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
