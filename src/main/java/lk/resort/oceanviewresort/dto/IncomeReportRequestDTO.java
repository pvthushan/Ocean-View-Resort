package lk.resort.oceanviewresort.dto;

public class IncomeReportRequestDTO {
    private String startDate;
    private String endDate;

    public IncomeReportRequestDTO() {
    }

    public IncomeReportRequestDTO(String startDate, String endDate) {
        this.setStartDate(startDate);
        this.setEndDate(endDate);
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
