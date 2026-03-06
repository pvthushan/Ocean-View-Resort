package lk.resort.oceanviewresort.dto;

import java.util.List;

public class DashboardStatsResponseDTO {
    private int todaysCheckins;
    private int availableRooms;
    private int totalOccupancyPercentage;
    private List<RecentActivityDTO> recentActivity;

    public DashboardStatsResponseDTO() {
    }

    public DashboardStatsResponseDTO(int todaysCheckins, int availableRooms, int totalOccupancyPercentage, List<RecentActivityDTO> recentActivity) {
        this.setTodaysCheckins(todaysCheckins);
        this.setAvailableRooms(availableRooms);
        this.setTotalOccupancyPercentage(totalOccupancyPercentage);
        this.setRecentActivity(recentActivity);
    }

    public int getTodaysCheckins() {
        return todaysCheckins;
    }

    public void setTodaysCheckins(int todaysCheckins) {
        this.todaysCheckins = todaysCheckins;
    }

    public int getAvailableRooms() {
        return availableRooms;
    }

    public void setAvailableRooms(int availableRooms) {
        this.availableRooms = availableRooms;
    }

    public int getTotalOccupancyPercentage() {
        return totalOccupancyPercentage;
    }

    public void setTotalOccupancyPercentage(int totalOccupancyPercentage) {
        this.totalOccupancyPercentage = totalOccupancyPercentage;
    }

    public List<RecentActivityDTO> getRecentActivity() {
        return recentActivity;
    }

    public void setRecentActivity(List<RecentActivityDTO> recentActivity) {
        this.recentActivity = recentActivity;
    }
}
