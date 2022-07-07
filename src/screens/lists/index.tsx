import styled from 'styled-components'
import { ListForm } from "./listForm"
import { Header } from "./header"
import { Lists } from "./lists"
import { useState } from 'react'
import { ListModal } from 'components/list-modal'
import { IList } from "types/lists";
import { useDocumentTitle } from 'utils'
import { ErrorBox } from 'components/lib'
import { useLists } from './util'


export const List = () => {
    useDocumentTitle('列表')

    const { isLoading, error, data: mylist = [] } = useLists();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [editingItem, setEditingItem] =  useState<IList | null>(null);
    // const onEdit = (item: IList) => {
    //     console.log(item)
    //     //TODO: 弹窗
    //     setIsModalVisible(true)
    //     setEditingItem(item)
    // }

    const close = () => {
        setIsModalVisible(false)
    }

    return (
        <Container>
            <Header />
            <ListForm/>
            <Lists lists={mylist} loading={isLoading}/>
            <ErrorBox error={error} />
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