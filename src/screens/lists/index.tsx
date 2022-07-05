import styled from 'styled-components'
import { ListForm } from "./listForm"
import { Header } from "./header"
import { Lists } from "./lists"
import { useEffect, useState } from 'react'
import { ListModal } from 'components/list-modal'
import { IList } from "types/lists";
import { useQuery } from 'react-query'

const API_URL = "http://localhost:3001"

export const List = () => {
    const [lists, setLists] = useState<IList[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] =  useState<IList | null>(null);

    // useEffect(() => {

    // }, [])

    const { isLoading, error, data: listsArr } = useQuery('lists', async () =>
        // fetch(`${API_URL}/lists`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setLists(data)
        //     })
        {
            const response = await fetch(`${API_URL}/lists`)
            if(!response.ok){
                throw new Error('not ok')
            }
            return response.json()
        }
       
    )

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

    if (isLoading) return <h1>loading...</h1>
 
    if (error) return <h1>An error has occurred: </h1>

    return (
        <Container>
            <Header />
            <ListForm onAdd={ onAdd }/>
            {JSON.stringify(listsArr)}
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