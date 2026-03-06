package lk.resort.oceanviewresort.servlet;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.resort.oceanviewresort.dto.CheckoutRequestDTO;
import lk.resort.oceanviewresort.dto.CheckoutResponseDTO;
import lk.resort.oceanviewresort.service.ReceptionService;
import lk.resort.oceanviewresort.service.impl.ReceptionServiceImpl;

import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/api/v1/reception/checkout")
public class CheckoutServlet extends HttpServlet {
    private ReceptionService receptionService = new ReceptionServiceImpl();
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        BufferedReader reader = req.getReader();
        CheckoutRequestDTO requestDTO = gson.fromJson(reader, CheckoutRequestDTO.class);

        CheckoutResponseDTO responseDTO = receptionService.processCheckout(requestDTO);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (responseDTO != null) {
            resp.setStatus(HttpServletResponse.SC_OK); // 200 OK
            resp.getWriter().write(gson.toJson(responseDTO));
        } else {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"Checkout failed. Please check reservation ID or status.\"}");
        }
    }
}
