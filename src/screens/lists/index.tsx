import styled from 'styled-components'
import { ListForm } from "./listForm"
import { Header } from "./header"
import { Lists } from "./lists"
import { useEffect, useState } from 'react'
import { ListModal } from 'components/list-modal'
import { IList } from "types/lists";
import { useQuery } from 'react-query'
import { useDocumentTitle } from 'utils'
import { ErrorBox } from 'components/lib'
import { useLists } from './util'

const API_URL = "http://localhost:3001"

export const List = () => {
    useDocumentTitle('列表')

    const [lists, setLists] = useState<IList[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] =  useState<IList | null>(null);

    // TODO: 使用react query实现异步数据请求
    const { isLoading, error, data: mylist } = useLists();
    // const { mutateAsync, error: isAddError, isLoading: isAddLoading } = useAddList()

    const fetchLists = () =>  fetch(`${API_URL}/lists`)
        .then(res => res.json())
        .then(data => {
            setLists(data)
        })

    useEffect(() => {
        fetchLists()
    }, [])

    const onAdd = (values: any) => {
        // TODO：使用react query实现异步添加数据
        // mutateAsync({...values, checked: false}).then(() => {
        //     // 重置表单？
        // })

        // setLists([...lists, {
        //     id: lists.length + 2,
        //     checked: false,
        //     ...values
        // }])
        fetchLists()
    }

    const onCheckStatusChange = (id: number) => {
        // const newItems = lists.map(item => {
        //     if(item.id === id){
        //         return {
        //             ...item,
        //             checked: !item.checked
        //         }
        //     }
        //     return {...item}
        // })
        // setLists(newItems)
        fetchLists()
    }

    const onEdit = (item: IList) => {
        console.log(item)
        //TODO: 弹窗
        setIsModalVisible(true)
        setEditingItem(item)
    }

    const onDelete = (id: number) => {
        // const newItems = lists.filter(item => item.id !== id)
        // setLists(newItems)
        fetchLists()
    }

    const close = () => {
        setIsModalVisible(false)
    }

    if (isLoading) return <h1>loading...</h1>
 
    if (error) return <ErrorBox error={error} />

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