import styled from 'styled-components'
import { ListForm } from "./listForm"
import { Header } from "./header"
import { Lists } from "./lists"
import { ListModal } from 'components/list-modal'
import { useDocumentTitle } from 'utils'
import { ErrorBox } from 'components/lib'
import { useLists } from './util'
import { Button, Spin } from 'antd'
import { useState } from 'react'


export const List = () => {
    useDocumentTitle('列表')
    const { isLoading, error, data: mylist = [] } = useLists();
   
    return (
        <Container>
            <Header />
            <ListForm/>
            {
                isLoading ? <Spin size={"large"} /> : <Lists lists={mylist} />
            }
            <ErrorBox error={error} />
        </Container>
    )
}

const Container = styled.div`
    width: 100rem;
    margin: 0 auto;
`