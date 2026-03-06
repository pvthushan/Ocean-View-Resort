package lk.resort.oceanviewresort.service;

import lk.resort.oceanviewresort.dto.DashboardStatsResponseDTO;
import lk.resort.oceanviewresort.dto.IncomeReportRequestDTO;
import lk.resort.oceanviewresort.dto.IncomeReportResponseDTO;
import lk.resort.oceanviewresort.dto.ReservationListResponseDTO;

public interface ManagerService {
    DashboardStatsResponseDTO getDashboardStats();
    ReservationListResponseDTO getAllReservations(String searchQuery);
    IncomeReportResponseDTO generateIncomeReport(IncomeReportRequestDTO request);

}
