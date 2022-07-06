import { Button, Checkbox } from "antd"
import {
    DeleteOutlined,
    EditOutlined
  } from '@ant-design/icons';
import styled from 'styled-components'
import { IList } from "types/lists";

interface ListsProps {
    lists: IList[],
    onCheckStatusChange?: (checked: number) => void,
    onDelete?: (id: number) => void,
    onEdit?: (item: IList) => void
}

const API_URL = "http://localhost:3001"

export const Lists = ({ lists, onCheckStatusChange, onDelete, onEdit }: ListsProps) => {

    const changeCheckStatus = (id: number, checked: boolean) => {
        fetch(`${API_URL}/lists/${id}`, {
            method: 'PATCH',
            // PS: 1、当method为非"GET"时，需要设置headers里的content-type，且body的参数需要JSON.stringify
            headers: {
                "Content-Type":  "application/json",
            },
            body: JSON.stringify({checked: !checked})
        })
        .then(res => res.json())
        .then(data => {
            // TODO: 修改状态成功，刷新列表
            onCheckStatusChange?.(id)
        })
    }

    const editItem = (item: IList) => {
        onEdit?.(item)
    }

    const deleteItem = (id: number) => {
        fetch(`${API_URL}/lists/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            // TODO: 删除成功，刷新列表
            onDelete?.(id)
        })
    }

    return (
        <div>
            {
                lists.map( item => (
                    <div key={item.id}>
                        <Item >
                            <div>
                                <Checkbox checked={item.checked} onChange={() => changeCheckStatus(item.id, item.checked)}/>
                                <Text checked={item.checked}>title #{item.title}</Text>    
                            </div>
                            <div>
                                <Button type="link" onClick={() => editItem(item)}>
                                    <EditOutlined 
                                        style={{color: 'green', fontSize: '1.8rem', marginRight: '1rem'}}
                                    />
                                </Button>
                                <Button type="link" onClick={() => deleteItem(item.id)}>
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