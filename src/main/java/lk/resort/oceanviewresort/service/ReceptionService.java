package lk.resort.oceanviewresort.service;

import lk.resort.oceanviewresort.dto.*;

public interface ReceptionService {
    CreateReservationResponseDTO createReservation(CreateReservationRequestDTO request);
    ViewReservationResponseDTO getReservationDetails(String reservationId);
    CheckoutResponseDTO processCheckout(CheckoutRequestDTO request);

}
