package lk.resort.oceanviewresort.servlet;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.resort.oceanviewresort.dto.AddUserRequestDTO;
import lk.resort.oceanviewresort.dto.AddUserResponseDTO;
import lk.resort.oceanviewresort.dto.DeleteUserResponseDTO;
import lk.resort.oceanviewresort.dto.UserListResponseDTO;
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

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        int page = 1;
        int limit = 10;

        String pageParam = req.getParameter("page");
        String limitParam = req.getParameter("limit");

        if (pageParam != null && !pageParam.isEmpty()) {
            page = Integer.parseInt(pageParam);
        }
        if (limitParam != null && !limitParam.isEmpty()) {
            limit = Integer.parseInt(limitParam);
        }

        UserListResponseDTO responseDTO = adminService.getAllUsers(page, limit);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (responseDTO != null) {
            resp.setStatus(HttpServletResponse.SC_OK); // 200 OK
            resp.getWriter().write(gson.toJson(responseDTO));
        } else {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"Failed to retrieve users.\"}");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String pathInfo = req.getPathInfo();

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (pathInfo == null || pathInfo.equals("/")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\": \"User ID is required.\"}");
            return;
        }

        try {
            int userId = Integer.parseInt(pathInfo.substring(1));

            DeleteUserResponseDTO responseDTO = adminService.deleteUser(userId);

            if (responseDTO != null) {
                resp.setStatus(HttpServletResponse.SC_OK);
                resp.getWriter().write(gson.toJson(responseDTO));
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\": \"User not found.\"}");
            }

        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\": \"Invalid User ID format.\"}");
        }
    }
}

