package com.project.board_project.mapper.reply;

import com.project.board_project.DTO.reply.ReplyDto;
import com.project.board_project.DTO.reply.ReplyPageDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReplyMapper {
    int insertOne(String name,String content);
    int deleteOne(int id);
    List<ReplyDto> findAll(ReplyPageDto pageDto);
    ReplyDto findByid(int id);

}
