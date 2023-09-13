package com.project.board_project.mapper;

import com.project.board_project.DTO.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insertOne(UserDto userDto);
    UserDto findByUserId(String uId);

}
