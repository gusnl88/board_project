package com.project.board_project.controller;

import com.project.board_project.DTO.UserDto;
import com.project.board_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class SignupController {
    @Autowired
    private UserService userService;
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
}
