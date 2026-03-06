package lk.resort.oceanviewresort.service.impl;

import lk.resort.oceanviewresort.db.DBConnection;
import lk.resort.oceanviewresort.dto.CheckoutRequestDTO;
import lk.resort.oceanviewresort.dto.CheckoutResponseDTO;
import lk.resort.oceanviewresort.service.ReceptionService;
import lk.resort.oceanviewresort.dto.InvoiceDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;


public class ReceptionServiceImpl implements ReceptionService {


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
                    internalResId = rs.getInt("reservation_id"); // Database එකේ තියෙන INT ID එක
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
