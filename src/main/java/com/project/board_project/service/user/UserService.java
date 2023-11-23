package com.project.board_project.service.user;

import com.project.board_project.DTO.user.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> findAll();
    int signup(UserDto userDto);
    UserDto idCheck(String uId);
    UserDto login(UserDto userDto);
}
