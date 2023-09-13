package com.project.board_project.service;
import com.github.pagehelper.PageHelper;
import com.project.board_project.DTO.ReplyDto;
import com.project.board_project.DTO.ReplyPageDto;
import com.project.board_project.mapper.ReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplayServiceImpl implements ReplayService{
    @Autowired
    private ReplyMapper replyMapper;
    @Override
    public int register(String name, String content) {
        return replyMapper.insertOne(name,content);
    }

    @Override
    public List<ReplyDto> list(ReplyPageDto pageDto) {
        PageHelper.startPage(pageDto.getPageNum(),pageDto.getPageSize(),pageDto.getOrder());
        return replyMapper.findAll(pageDto);
    }
}
