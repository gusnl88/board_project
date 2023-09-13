package com.project.board_project.service;

import com.project.board_project.DTO.ReplyDto;
import com.project.board_project.DTO.ReplyPageDto;

import java.util.List;

public interface ReplayService {
    int register(String name,String content);
    List<ReplyDto> list(ReplyPageDto PageDto);
}
