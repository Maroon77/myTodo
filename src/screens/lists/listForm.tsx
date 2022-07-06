import { Button, Form, Input } from 'antd';
import { AddButton, GreenInput } from 'components/style';
import styled from 'styled-components'

interface FormItemProps{
    title: string,
    description: string
}

interface ListFormProps {
    onAdd: (values: FormItemProps) => void
}

const API_URL = "http://localhost:3001"

export const ListForm = ({onAdd} : ListFormProps) => {
    const [listForm] = Form.useForm();

    const onFinish = (values: FormItemProps) => {
        listForm.resetFields();
        fetch(`${API_URL}/lists`, {
            method: 'POST',
            headers: {
                "Content-Type":  "application/json",
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            // TODO: 添加成功，刷新列表
           onAdd(values)
        })
    };

    return (
        <Form
            form={listForm}
            name="listForm"
            autoComplete="off"
            onFinish={onFinish}
            style={{textAlign: "center"}}
            >
            <Form.Item
                name="title"
            >
                <GreenInput placeholder='Title'/>
            </Form.Item>
            <Form.Item
                name="description"
            >
                <GreenInput placeholder='description' />
            </Form.Item>
            <Form.Item>
                {/* <AddButton type="primary" htmlType="submit" loading={addLoading}> */}
                <AddButton type="primary" htmlType="submit">
                    Add
                </AddButton>
            </Form.Item>
        </Form>
    )
}