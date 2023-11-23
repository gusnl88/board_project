package com.project.board_project.service.user;

import com.project.board_project.DTO.user.UserDto;
import com.project.board_project.mapper.user.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
        private UserMapper userMapper;
        private List<UserDto> userList;

    @Override
    public List<UserDto> findAll() {
        return userMapper.findAll();
    }

    @Override
    public int signup(UserDto userDto) {
        return userMapper.insertOne(userDto);
    }

    @Override
    public UserDto idCheck(String uId) {
        return userMapper.findByUserId(uId);
    }

    @Override
    public UserDto login(UserDto userDto) {
        userList = userMapper.findAll();
        for(UserDto user:userList){
            if (user.getUId().equals(userDto.getUId())||user.getPw().equals(userDto.getPw())){
                return userMapper.findByUidAndPw(userDto);
            }
        }
        return null;}
}
