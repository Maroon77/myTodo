import { Card } from 'antd';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router";
import { useLogin } from 'screens/login/utils';
import styled from 'styled-components';
import './App.css';
import { List } from './screens/lists';
import { Login } from './screens/login';


function App() {
  const { data } = useLogin()

  // const bootstrapUser = async () => {
  //   let user = null;
  //   const token = auth.getToken();
  //   if (token) {
  //     const data = await http("me", { token });
  //     user = data.user;
  //   }
  //   return user;
  // };

  // useEffect(() => {
  //   bootstrapUser();
  // });

  return (
    <div className="App">
      {/* <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {
          data?.user?.token ? 
          <Container>
              <Routes>
                <Route path={"/lists"} element={<List />} />
                <Route path="*" element={<Navigate to={'/lists'} replace={true} />}></Route>
              </Routes>
          </Container>
          : 
          <Container>
            <ShadowCard>
              <Title>请登录</Title>
              <Login />
            </ShadowCard>
          </Container>
        }
      </ErrorBoundary> */}
      <Container>
          <Routes>
            <Route path={"/lists"} element={<List />} />
            <Route path="*" element={<Navigate to={'/lists'} replace={true} />}></Route>
          </Routes>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  height: 40rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export default App;
