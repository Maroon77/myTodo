import styled from 'styled-components'
import { ListForm } from "./listForm"
import { Header } from "./header"
import { Lists } from "./lists"
import { useState } from 'react'
import { ListModal } from 'components/list-modal'
import { IList } from "types/lists";

export const List = () => {
    const [lists, setLists] = useState<IList[]>([
        {
            id: 1,
            title: "1",
            description: "1",
            checked: true
        },
        {
            id: 2,
            title: "2",
            description: "2",
            checked: true
        },
        {
            id: 3,
            title: "3",
            description: "3",
            checked: false
        }
    ])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] =  useState<IList | null>(null);

    const onAdd = (values: any) => {
        setLists([...lists, {
            id: lists.length + 2,
            checked: false,
            ...values
        }])
    }

    const onCheckStatusChange = (id: number) => {
        const newItems = lists.map(item => {
            if(item.id === id){
                return {
                    ...item,
                    checked: !item.checked
                }
            }
            return {...item}
        })
        setLists(newItems)
    }

    const onDelete = (id: number) => {
        const newItems = lists.filter(item => item.id !== id)
        setLists(newItems)
    }

    const onEdit = (item: IList) => {
        console.log(item)
        //TODO: 弹窗
        setIsModalVisible(true)
        setEditingItem(item)
    }

    const close = () => {
        setIsModalVisible(false)
    }

    return (
        <Container>
            <Header />
            <ListForm onAdd={ onAdd }/>
            <Lists 
                lists={lists} 
                onCheckStatusChange={onCheckStatusChange}
                onDelete={onDelete}
                onEdit={onEdit}/>
            <ListModal 
                isModalVisible={isModalVisible} 
                editingItem={editingItem}
                close={close}/>
        </Container>
    )
}

const Container = styled.div`
    width: 100rem;
    margin: 0 auto;
`