package com.project.board_project;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@AllArgsConstructor
public class index {
    @GetMapping("/index")
    public String indexPage(){
        return "/main/signup";
    }

}
