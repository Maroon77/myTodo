import { Form, Modal } from "antd"
import { AddButton, GreenInput } from "components/style";
import { useEditList, useModal } from "screens/lists/util";
import { IList } from "types/lists";

export const ListModal = (
    // { modalOpen, editingItem, onClose }: {
    //     modalOpen?: boolean, 
    //     editingItem?: IList | null,
    //     onClose?: () => void
    // }
) => {
    const {
        modalOpen,
        close,
    } = useModal()

    const editingItem = {
        title: 'HH',
        description: 'hhhh'
    }

    const [editForm] = Form.useForm();
    const { mutateAsync: editMutate } = useEditList()

    const onFinish = (values: any) => {
        // editMutate({...editingItem, ...values}).then(() => {
        //     editForm.resetFields();
        //     // onClose()
        //     close()
        // })
    };

    const closeModal = () => {
        editForm.resetFields();
        // onClose()
    }

    return (
        <Modal  
            visible={modalOpen} 
            title="edit" 
            onCancel={closeModal}
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