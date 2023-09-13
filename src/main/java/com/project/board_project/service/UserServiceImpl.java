package com.project.board_project.service;

import com.project.board_project.DTO.UserDto;
import com.project.board_project.mapper.UserMapper;
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
}
