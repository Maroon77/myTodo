import { Form, FormItemProps, Modal } from "antd"
import { AddButton, GreenInput } from "components/style";
import { IList } from "types/lists";

export const ListModal = ({isModalVisible, editingItem, close}: {
    isModalVisible: boolean,
    editingItem: IList | null,
    close: () => void
}) => {
    const [editForm] = Form.useForm();

    const onFinish = () => {
        editForm.resetFields();
        // TODO: 请求接口修改数据，刷新列表
        // close()
    };
    
    return (
        <Modal 
            title="edit" 
            visible={isModalVisible} 
            onCancel={close}
            footer={null}>
            <Form
                form={editForm}
                name="listForm"
                autoComplete="off"
                onFinish={onFinish}
                style={{textAlign: "center"}}
            >
            <Form.Item
                name="title"
                initialValue={editingItem?.title}
            >
                <GreenInput placeholder='Title'/>
            </Form.Item>
            <Form.Item
                name="description"
                initialValue={editingItem?.description}
            >
                <GreenInput placeholder='description'/>
            </Form.Item>
            <Form.Item>
                <AddButton type="primary" htmlType="submit">
                    confirm
                </AddButton>
            </Form.Item>
        </Form>
      </Modal>
    )
}