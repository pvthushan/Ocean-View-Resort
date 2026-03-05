package lk.resort.oceanviewresort.servlet;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.resort.oceanviewresort.dto.LoginRequestDTO;
import lk.resort.oceanviewresort.dto.LoginResponseDTO;
import lk.resort.oceanviewresort.service.AuthService;
import lk.resort.oceanviewresort.service.impl.AuthServiceImpl;

import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/api/v1/auth/login")
public class AuthServlet extends HttpServlet {

    private AuthService authService = new AuthServiceImpl();
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        BufferedReader reader = req.getReader();
        LoginRequestDTO loginRequest = gson.fromJson(reader, LoginRequestDTO.class);

        LoginResponseDTO responseDTO = authService.login(loginRequest);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (responseDTO != null) {
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write(gson.toJson(responseDTO));
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\": \"Invalid username or password\"}");
        }
    }
}
