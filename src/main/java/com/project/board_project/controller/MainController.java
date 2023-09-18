package com.project.board_project.controller;

import com.github.pagehelper.PageInfo;
import com.project.board_project.DTO.ReplyDto;
import com.project.board_project.DTO.ReplyPageDto;
import com.project.board_project.service.ReplayService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public String main(Model model, @ModelAttribute ReplyPageDto replyPageDto) {
        List<ReplyDto> reply;
        reply=replayService.list(replyPageDto);
        PageInfo<ReplyDto> page=new PageInfo<>(reply);
        model.addAttribute("reply",reply);
        model.addAttribute("page",page);
        return "main";
    }

    @Data
    public static class CommentRequest {
        private String name;
        private String content;

        // 게터와 세터 메서드 생략 (Lombok 등을 사용하면 코드를 간소화할 수 있음)
    }

    @PostMapping("/reply")
    @ResponseBody
    public ResponseEntity<String> replyRegister(@RequestBody CommentRequest commentRequest) {
        String name = commentRequest.getName();
        String content = commentRequest.getContent();

        if (name != null && content != null) {
            try {
                // 댓글 등록 로직을 수행합니다.
                replayService.register(name, content);

                // 댓글 등록 성공 시 200 OK 응답을 반환합니다.
                return ResponseEntity.ok("댓글이 성공적으로 등록되었습니다.");
            } catch (Exception e) {
                // 댓글 등록 중 오류가 발생한 경우 500 Internal Server Error 응답을 반환합니다.
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 등록 중 오류가 발생했습니다.");
            }
        } else {
            // 요청 데이터가 유효하지 않은 경우 400 Bad Request 응답을 반환합니다.
            return ResponseEntity.badRequest().body("이름과 내용을 모두 입력하세요.");
        }
    }
}