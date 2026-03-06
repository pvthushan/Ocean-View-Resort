package lk.resort.oceanviewresort.service;

import lk.resort.oceanviewresort.dto.DashboardStatsResponseDTO;
import lk.resort.oceanviewresort.dto.IncomeReportRequestDTO;
import lk.resort.oceanviewresort.dto.IncomeReportResponseDTO;

public interface ManagerService {
    DashboardStatsResponseDTO getDashboardStats();
    IncomeReportResponseDTO generateIncomeReport(IncomeReportRequestDTO request);
}
