package com.project.board_project.service.reply;

import com.project.board_project.DTO.reply.ReplyDto;
import com.project.board_project.DTO.reply.ReplyPageDto;

import java.util.List;

public interface ReplayService {
    int register(String name,String content);
    int remove(int id);
    List<ReplyDto> list(ReplyPageDto PageDto);
}
