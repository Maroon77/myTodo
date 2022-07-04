import styled from 'styled-components'
import { ListForm } from "./listForm"
import { Header } from "./header"
import { Lists } from "./lists"
import { useState } from 'react'

export const List = () => {
    const [lists, setLists] = useState<{
        id: number,
        title: string,
        description: string,
        checked: boolean
    }[]>([
        {
            id: 1,
            title: "1",
            description: "1",
            checked: false
        },
        {
            id: 2,
            title: "2",
            description: "2",
            checked: true
        }
    ])

    const onAdd = (values: any) => {
        setLists([...lists, {
            id: lists.length +2,
            checked: false,
            ...values
        }])
        // 清空表单
    }

    const onCheckStatusChange = (id: number) => {
        const item = lists.find(item=> item.id === id)
        const newItem = {
            ...item, 
            checked: !item?.checked
        }
        console.log(newItem);
        // setLists([...lists, newItem])
    }

    const onDelete = (id: number) => {

       
    }

    return (
        <Container>
            <Header />
            <ListForm onAdd={ onAdd }/>
            <Lists 
                lists={lists} 
                onCheckStatusChange={onCheckStatusChange}
                onDelete={onDelete}/>
        </Container>
    )
}

const Container = styled.div`
    width: 100rem;
    margin: 0 auto;
`