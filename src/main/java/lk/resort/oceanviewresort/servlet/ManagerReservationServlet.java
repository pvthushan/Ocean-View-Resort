package lk.resort.oceanviewresort.servlet;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.resort.oceanviewresort.dto.ReservationListResponseDTO;
import lk.resort.oceanviewresort.service.ManagerService;
import lk.resort.oceanviewresort.service.impl.ManagerServiceImpl;

import java.io.IOException;

@WebServlet("/api/v1/manager/reservations")
public class ManagerReservationServlet extends HttpServlet {

    private ManagerService managerService = new ManagerServiceImpl();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String searchQuery = req.getParameter("search");

        ReservationListResponseDTO responseDTO = managerService.getAllReservations(searchQuery);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (responseDTO != null) {
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write(gson.toJson(responseDTO));
        } else {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"Failed to retrieve reservations.\"}");
        }
    }
}

