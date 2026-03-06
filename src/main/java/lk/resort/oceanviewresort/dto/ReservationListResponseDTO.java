package lk.resort.oceanviewresort.dto;

import java.util.List;

public class ReservationListResponseDTO {
    private List<ReservationDTO> reservations;

    public ReservationListResponseDTO() {
    }

    public ReservationListResponseDTO(List<ReservationDTO> reservations) {
        this.setReservations(reservations);
    }

    public List<ReservationDTO> getReservations() {
        return reservations;
    }

    public void setReservations(List<ReservationDTO> reservations) {
        this.reservations = reservations;
    }
}
