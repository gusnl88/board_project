package com.project.board_project.service.user;

import com.project.board_project.DTO.user.UserDto;

public interface UserService {
    int signup(UserDto userDto);
    UserDto idCheck(String uId);
    UserDto login(UserDto userDto);
}
