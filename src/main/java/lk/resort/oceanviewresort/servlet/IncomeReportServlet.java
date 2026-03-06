package lk.resort.oceanviewresort.servlet;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.resort.oceanviewresort.dto.IncomeReportRequestDTO;
import lk.resort.oceanviewresort.dto.IncomeReportResponseDTO;
import lk.resort.oceanviewresort.service.ManagerService;
import lk.resort.oceanviewresort.service.impl.ManagerServiceImpl;

import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/api/v1/manager/reports/income")
public class IncomeReportServlet extends HttpServlet {

    private ManagerService managerService = new ManagerServiceImpl();
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        BufferedReader reader = req.getReader();
        IncomeReportRequestDTO reportRequest = gson.fromJson(reader, IncomeReportRequestDTO.class);

        IncomeReportResponseDTO responseDTO = managerService.generateIncomeReport(reportRequest);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (responseDTO != null) {
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write(gson.toJson(responseDTO));
        } else {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"Failed to generate income report.\"}");
        }
    }
}
