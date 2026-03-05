package lk.resort.oceanviewresort.servlet;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.resort.oceanviewresort.dto.AddUserRequestDTO;
import lk.resort.oceanviewresort.dto.AddUserResponseDTO;
import lk.resort.oceanviewresort.service.AdminService;
import lk.resort.oceanviewresort.service.impl.AdminServiceImpl;

import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/api/v1/admin/users/*")
public class UserServlet extends HttpServlet {

    private AdminService adminService = new AdminServiceImpl();
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        BufferedReader reader = req.getReader();
        AddUserRequestDTO userRequest = gson.fromJson(reader, AddUserRequestDTO.class);

        AddUserResponseDTO responseDTO = adminService.addUser(userRequest);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (responseDTO != null) {
            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write(gson.toJson(responseDTO));
        } else {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"Failed to create user. Username might already exist.\"}");
        }
    }
}

