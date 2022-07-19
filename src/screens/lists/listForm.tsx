import { Form } from 'antd';
import { AddButton, GreenInput } from 'components/style';
import { IList } from 'types/lists';
import { useAddList } from './util';

export const ListForm = () => {
    const [listForm] = Form.useForm();
    const { mutateAsync: addMutate, isLoading}= useAddList()

    const onFinish = (values: Partial<IList>) => {
        // 警告: 自定义hook不能在函数里使用！！！
        // const { mutateAsync: addMutate}= useAddList()
        addMutate(values).then(() => {
            listForm.resetFields();
        })
    };

    return (
        <Form
            form={listForm}
            name="listForm"
            autoComplete="off"
            onFinish={onFinish}
            data-testid="list-form"
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
                <AddButton type="primary" htmlType="submit" loading={isLoading} data-testid="add-btn">
                    Add
                </AddButton>
            </Form.Item>
        </Form>
    )
}