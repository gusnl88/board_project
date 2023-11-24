package com.project.board_project.controller.user;

import com.project.board_project.DTO.user.UserDto;
import com.project.board_project.service.user.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/user")
@Log4j2
public class SignupController {
    @Autowired
    private UserService userService;

    @GetMapping("login")
    public String login() {
        return "user/login";
    }

    @PostMapping("/login")
    public String loginAction(UserDto user, HttpSession session, RedirectAttributes redirectAttributes) {
        // 사용자 리스트 가져오기 (예: userService.getUserList() 메서드 구현 필요)
        List<UserDto> userList = userService.findAll();

        // 아이디와 비밀번호가 맞는지 확인
        for (UserDto storedUser : userList) {
            if (storedUser.getUId().equals(user.getUId()) && storedUser.getPw().equals(user.getPw())) {
                // 로그인 성공 시 세션에 사용자 정보 저장
                session.setAttribute("loginUser", storedUser);
                return "redirect:/main#comments";
            }
        }

        // 로그인 실패 시, 에러 메시지를 전달
        redirectAttributes.addAttribute("error", "아이디 또는 비밀번호가 올바르지 않습니다.");
        return "redirect:/user/login";
    }

    @GetMapping("")
    public String sig() {
        return "user/signup";
    }

    @PostMapping("/signup")
    public String signup(@ModelAttribute UserDto userDto, RedirectAttributes redirectAttributes, @RequestParam("pwCheck") String pwCheck) {
        if (userDto.getUId() == "" || userDto.getName() == "" || userDto.getPw() == ""||userDto.getName().length()>4||!userDto.getName().matches("^[가-힣]+$")) {
            // 필수 입력값이 비어있을 경우 에러 메시지를 리다이렉트 속성에 추가
            redirectAttributes.addAttribute("error", "모든 필수 입력값을 제공해야 합니다.");
            return "redirect:/user"; // 에러가 발생한 경우 다시 회원가입 페이지로 리다이렉트
        }
        if (!pwCheck.equals(userDto.getPw())) {
            redirectAttributes.addAttribute("error", "비밀번호가 같지않습니다");
            return "redirect:/user";
        }

        userService.signup(userDto);
        redirectAttributes.addAttribute("success", "회원가입이 완료되었습니다.");
        return "redirect:/user/login"; // 리다이렉트할 URL
    }

    @ResponseBody
    @GetMapping("/{uId}/checkId.do")
    public int checkId(@PathVariable String uId) {
        System.out.println(uId);
        UserDto result = userService.idCheck(uId);
        if (result != null) {
            return 1;
        } else {
            return 0;
        }
    }

    ;

    @GetMapping("logout")
    public String logout(HttpSession session) {
        session.removeAttribute("loginUser");
        return "redirect:/main#comments";
    }
}
