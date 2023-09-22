package com.project.board_project.DTO.reply;

import lombok.Data;

@Data
public class ReplyPageDto {
    private int pageNum=1;
    private int pageSize=5;
    private String order="id DESC";
}
