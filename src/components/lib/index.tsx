// 类型守卫

import { Typography } from "antd";
import styled from "styled-components";

// 当符合value?.message, value就是Error类型
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({error}: {error: unknown}) => {
    // 如果有message属性，就判定为Error类型
    // error为unknown类型，使用error?.message也不能解决ts的报错，使用类型守卫解决
    if(isError(error)){
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
    }
    return null
}


const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
    <FullPage>
      <ErrorBox error={error} />
    </FullPage>
  );