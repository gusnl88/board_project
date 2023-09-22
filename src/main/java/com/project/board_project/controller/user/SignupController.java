package com.project.board_project.controller.user;

import com.project.board_project.DTO.user.UserDto;
import com.project.board_project.service.user.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/user")
@Log4j2
public class SignupController {
    @Autowired
    private UserService userService;
    @GetMapping("login")
    public String login(){
        return "user/login";
    }
    @PostMapping("login")
    public String loginAction(UserDto user, HttpSession session, RedirectAttributes redirectAttributes){
        System.out.println(user);
        UserDto loginUser=null;
        try {
            loginUser=userService.login(user);
            session.setAttribute("loginUser",loginUser);
        }catch (Exception e){
        log.error(e.getMessage());
        }
//        redirectAttributes.addAttribute("login",loginUser);
    return "redirect:/";
    }
    @GetMapping("")
    public String sig(){
        return "user/signup";
    }
    @PostMapping("/signup")
    public String signup(@ModelAttribute UserDto userDto) {
        userService.signup(userDto);
        return "redirect:/"; // 리다이렉트할 URL
    }
    @ResponseBody
    @GetMapping("/{uId}/checkId.do")
    public int checkId(@PathVariable String uId){
        System.out.println(uId);
        UserDto result=userService.idCheck(uId);
        if(result !=null){
            return 1;
        }else {
            return 0;
        }
    };
    @GetMapping("logout")
    public String logout(HttpSession session){
        session.removeAttribute("loginUser");
        return "redirect:/";
    }
}
