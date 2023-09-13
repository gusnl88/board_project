package com.project.board_project.mapper;

import com.project.board_project.DTO.ReplyDto;
import com.project.board_project.DTO.ReplyPageDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReplyMapper {
    int insertOne(String name,String content);
    List<ReplyDto> findAll(ReplyPageDto pageDto);

}
