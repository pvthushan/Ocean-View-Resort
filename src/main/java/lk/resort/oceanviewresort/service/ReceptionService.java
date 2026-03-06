package lk.resort.oceanviewresort.service;

import lk.resort.oceanviewresort.dto.CheckoutRequestDTO;
import lk.resort.oceanviewresort.dto.CheckoutResponseDTO;
import lk.resort.oceanviewresort.dto.CreateReservationRequestDTO;
import lk.resort.oceanviewresort.dto.CreateReservationResponseDTO;

public interface ReceptionService {
    CreateReservationResponseDTO createReservation(CreateReservationRequestDTO request);
    CheckoutResponseDTO processCheckout(CheckoutRequestDTO request);

}
