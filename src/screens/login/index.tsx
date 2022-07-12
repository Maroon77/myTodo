import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { ILogin } from 'types/login';
import { useLogin } from './utils';

const localStorageKey = "__auth_provider_token__";

export const Login = () => {
    const { mutateAsync: loginMutate } = useLogin()

    const onFinish = (values: ILogin) => {
        loginMutate(values).then(data => {
            window.localStorage.setItem(localStorageKey, data.user.token || "");
        })
    }

    const logout = () => {
        window.localStorage.removeItem(localStorageKey);
    } 

    return (
        <Form
            name="login"
            autoComplete="off"
            onFinish={onFinish}
            >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}