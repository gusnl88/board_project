package com.project.board_project.service.user;

import com.project.board_project.DTO.user.UserDto;
import com.project.board_project.mapper.user.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
        private UserMapper userMapper;
    @Override
    public int signup(UserDto userDto) {
        return userMapper.insertOne(userDto);
    }

    @Override
    public UserDto idCheck(String uId) {
        return userMapper.findByUserId(uId);
    }

    @Override
    public UserDto login(UserDto userDto) {return userMapper.findByUidAndPw(userDto);}
}
