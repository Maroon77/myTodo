import { useLogin } from 'screens/login/utils'
import styled from 'styled-components'

export const Header = () => {
    // const {data: user } = useLogin() 
    
    return (
        <ListHeader>
            <h1>MY TASK</h1>
        </ListHeader>
    )
}

const ListHeader = styled.header`
    height: 6rem;
    line-height: 6rem;
    text-align: center; 
`