import { Form, FormItemProps, Modal } from "antd"
import { AddButton, GreenInput } from "components/style";
import { useEffect } from "react";
import { IList } from "types/lists";

const API_URL = "http://localhost:3001"

export const ListModal = ({isModalVisible, editingItem, close}: {
    isModalVisible: boolean,
    // editingItem: IList | null,
    editingItem?: any,
    close: () => void
}) => {
    const [editForm] = Form.useForm();
    // TODO: 透传editingItem时，id可能为空，如何解决（通过请求接口获取单个item？）
    // const {id, ...rest} = editingItem


    const onFinish = () => {
        editForm.resetFields();
        // TODO: 请求接口修改数据，刷新列表
        // fetch(`${API_URL}/lists/${id}`, {
        //     method: 'PATCH',
        //     // PS: 1、当method为非"GET"时，需要设置headers里的content-type，且body的参数需要JSON.stringify
        //     headers: {
        //         "Content-Type":  "application/json",
        //     },
        //     body: JSON.stringify(rest)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     // TODO: 修改数据成功，关闭窗口，刷新列表
        //     close()
        // })
    };

    //当editingItem或者editForm变化时，重置表单
    // useEffect(() => {
    //     editForm.setFields(editingItem)
    // }, [editForm, editingItem])
    
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