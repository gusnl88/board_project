package com.project.board_project.mapper.user;

import com.project.board_project.DTO.user.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    List<UserDto> findAll();
    int insertOne(UserDto userDto);
    UserDto findByUserId(String uId);
    UserDto findByUidAndPw(UserDto userDto);

}
