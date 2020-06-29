package com.example.ingredient.exception;

/**
 * @author
 * @email
 * @description 自定义异常类
 */

public class MyException extends RuntimeException {
    // 异常信息
    private String message;

    public MyException() {
        super();
    }

    public MyException(String message) {
        super();
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

