import { Button, Checkbox, Modal } from "antd"
import {
    DeleteOutlined,
    EditOutlined
  } from '@ant-design/icons';
import styled from 'styled-components'
import { IList } from "types/lists";
import { useDeleteList, useEditList, useModal } from "./util";
import { ListModal } from "components/list-modal";
import { useState } from "react";

interface ListsProps {
    lists: IList[],
}

export const Lists = ({ lists }: ListsProps) => {
    const { mutateAsync: deleteMutate } = useDeleteList()
    // TODO：了解mutate和mutateAsync的区别
    // const { mutate: editMutate } = useEditList()
    const { mutateAsync: editMutate } = useEditList()
    // const { startEdit, open, modalOpen } = useModal();

    const [modalOpen, setModalOpen] = useState(false)
    const [editingItem,setEditingItem] = useState<IList | null>(null)


    const confirmDelete = (id: number) => {
        Modal.confirm({
          title: "确定删除这一项吗?",
          content: "点击确定删除",
          okText: "确定",
          onOk() {
            deleteMutate(id);
          },
        });
      };
    
    const editItem = (item: IList) => {
        setModalOpen(true)
        setEditingItem(item)
    }

    const closeModal = () => {
        setModalOpen(false)
        setEditingItem(null)
    }

    return (
        <div>
            {
                lists.map( item => (
                    <div key={item.id}>
                        <Item >
                            <div>
                                <Checkbox checked={item.checked} onChange={() => editMutate({id: item.id, checked: !item.checked})}/>
                                <Text checked={item.checked}>title #{item.title}</Text>    
                            </div>
                            <div>
                                <Button type="link" onClick={() => editItem(item)}>
                                    <EditOutlined 
                                        style={{color: 'green', fontSize: '1.8rem', marginRight: '1rem'}}
                                    />
                                </Button>
                                {/* <Button type="link" onClick={() => deleteMutate(item.id)}> */}
                                <Button type="link" onClick={() => confirmDelete(item.id)}>
                                    <DeleteOutlined 
                                        style={{color: 'pink', fontSize: '1.8rem', marginRight: '1rem'}} 
                                    />
                                </Button>
                            </div>
                        </Item>
                        <Desc checked={item.checked}>description #{item.description}</Desc>
                    </div>
                ))
            }
            <ListModal modalOpen={modalOpen} editingItem={editingItem} onClose={closeModal}/>
        </div>
    )
}

const Item = styled.div`
    display: flex;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #000;
    justify-content: space-between;
    align-items: center;
`

const Text = styled.span<{
    checked?: boolean
}>`
    margin-left: 1rem;
    font-size: 1.8rem;
    color: ${props => props.checked ? "lightGray" : "black"};
    text-decoration: ${props => props.checked ? "line-through" : undefined};
`

const Desc = styled.p<{
    checked?: boolean
}>`
    color: ${props => props.checked ? "lightGray" : "black"};
    text-decoration: ${props => props.checked ? "line-through" : undefined};
`