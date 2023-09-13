package com.project.board_project.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class ReplyDto {
    private int id;
    private String name;
    private String content;
    private Date created_at;
}
