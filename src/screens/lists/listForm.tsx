import { Button, Form, Input } from 'antd';
import styled from 'styled-components'

interface FormItemProps{
    title: string,
    description: string
}

interface ListFormProps {
    onAdd: (values: FormItemProps) => void
}

export const ListForm = ({onAdd} : ListFormProps) => {
    const [listForm] = Form.useForm();

    const onFinish = (values: FormItemProps) => {
        listForm.resetFields();
        onAdd(values)
    };

    return (
        <Form
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
                <AddButton type="primary" htmlType="submit">
                    Add
                </AddButton>
            </Form.Item>
        </Form>
    )
}

const GreenInput = styled(Input)`
    background: #29c529;
`

const AddButton = styled(Button)`
    width: 20rem;
    height: 5rem;
    background-color: lightblue;
    border-radius: 10rem;
    font-size: 2rem;
    color: #fff;
    font-weight: bold;
`