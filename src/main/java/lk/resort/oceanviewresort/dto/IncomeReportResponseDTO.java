package lk.resort.oceanviewresort.dto;

import java.util.List;

public class IncomeReportResponseDTO {
    private double totalIncome;
    private List<DailyIncomeDTO> dailyBreakdown;

    public IncomeReportResponseDTO() {
    }

    public IncomeReportResponseDTO(double totalIncome, List<DailyIncomeDTO> dailyBreakdown) {
        this.setTotalIncome(totalIncome);
        this.setDailyBreakdown(dailyBreakdown);
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public List<DailyIncomeDTO> getDailyBreakdown() {
        return dailyBreakdown;
    }

    public void setDailyBreakdown(List<DailyIncomeDTO> dailyBreakdown) {
        this.dailyBreakdown = dailyBreakdown;
    }
}
