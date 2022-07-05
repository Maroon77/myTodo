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

export const Lists = ({ lists, onCheckStatusChange, onDelete, onEdit }: ListsProps) => {

    const changeCheckStatus = (id: number) => {
        onCheckStatusChange?.(id)
    }

    const deleteItem = (id: number) => {
        onDelete?.(id)
    }

    const editItem = (item: IList) => {
        onEdit?.(item)
    }

    return (
        <div>
            {
                lists.map( item => (
                    <div key={item.id}>
                        <Item >
                            <div>
                                <Checkbox checked={item.checked} onChange={() => changeCheckStatus(item.id)}/>
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