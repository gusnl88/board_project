package com.project.board_project.service.reply;
import com.github.pagehelper.PageHelper;
import com.project.board_project.DTO.reply.ReplyDto;
import com.project.board_project.DTO.reply.ReplyPageDto;
import com.project.board_project.mapper.reply.ReplyMapper;
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
    public int remove(int id) {
        return replyMapper.deleteOne(id);
    }

    @Override
    public List<ReplyDto> list(ReplyPageDto pageDto) {
        PageHelper.startPage(pageDto.getPageNum(),pageDto.getPageSize(),pageDto.getOrder());
        return replyMapper.findAll(pageDto);
    }

    @Override
    public ReplyDto findByid(int id) {
        return replyMapper.findByid(id);
    }
}
