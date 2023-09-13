package com.project.board_project.service;

import com.project.board_project.DTO.UserDto;

public interface UserService {
    int signup(UserDto userDto);
    UserDto idCheck(String uId);
}
