package com.project.board_project.controller;

import com.github.pagehelper.PageInfo;
import com.project.board_project.DTO.reply.ReplyDto;
import com.project.board_project.DTO.reply.ReplyPageDto;
import com.project.board_project.DTO.user.UserDto;
import com.project.board_project.service.reply.ReplayService;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/main")
public class MainController {
    @Autowired
    private ReplayService replayService;

    @GetMapping("")
    public String main(Model model, HttpSession session, @ModelAttribute ReplyPageDto replyPageDto) {
        Integer commentCount = (Integer) session.getAttribute("commentCount");

        if (commentCount == null) {
            // 세션에 댓글 횟수가 없으면 초기화
            commentCount = 0;
            session.setAttribute("commentCount", commentCount);
        }
        UserDto loginUser = (UserDto) session.getAttribute("loginUser");

        // 가져온 사용자 정보를 모델에 추가
        model.addAttribute("loginUser", loginUser);
        // 댓글 작성 횟수를 모델에 추가
        model.addAttribute("commentCount", commentCount);

        List<ReplyDto> reply;
        reply=replayService.list(replyPageDto);
        PageInfo<ReplyDto> page=new PageInfo<>(reply);
        model.addAttribute("reply",reply);
        model.addAttribute("page",page);

        return "main/main";
    }

    @GetMapping("/main/comments")
    public String getComments(Model model, @ModelAttribute ReplyPageDto replyPageDto) {
        List<ReplyDto> reply = replayService.list(replyPageDto);
        PageInfo<ReplyDto> page = new PageInfo<>(reply);
        model.addAttribute("reply", reply);
        model.addAttribute("page", page);
        return "main/comments :: commentsFragment";
    }

    @Data
    public static class CommentRequest {
        private String name;
        private String content;

        // 게터와 세터 메서드 생략 (Lombok 등을 사용하면 코드를 간소화할 수 있음)
    }
    @GetMapping("/{id}/delete")
    public String deleteAction(@PathVariable int id){
        int result=replayService.remove(id);
        return "redirect:/main";
    }
    @PostMapping("/reply")
    @ResponseBody
    public String replyRegister(@RequestBody CommentRequest commentRequest, HttpSession session) {
        String name = commentRequest.getName();
        String content = commentRequest.getContent();

        // 세션에서 댓글 횟수를 가져옴
        Integer commentCount = (Integer) session.getAttribute("commentCount");

        if (commentCount == null) {
            // 세션에 댓글 횟수가 없으면 초기화
            commentCount = 0;
        }

        if (commentCount < 3) {
            // 댓글 횟수가 허용 범위 내일 경우
            replayService.register(name, content);
            commentCount++; // 댓글 횟수 증가
            session.setAttribute("commentCount", commentCount); // 세션에 업데이트된 댓글 횟수 저장

            return "success";
        } else {
            // 댓글 횟수가 초과할 경우

            return "exceeded";
        }
    }
}