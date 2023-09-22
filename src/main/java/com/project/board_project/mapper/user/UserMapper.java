package com.project.board_project.mapper.user;

import com.project.board_project.DTO.user.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insertOne(UserDto userDto);
    UserDto findByUserId(String uId);
    UserDto findByUidAndPw(UserDto userDto);

}
