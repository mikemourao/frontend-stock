import styled, { keyframes } from 'styled-components';
import { Row, Col } from 'antd';

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled(Row)`
    height: 100vh;
`;

export const LeftContent = styled(Col)`
    display: flex;
    background: #f0afab;
    background-size: 100%;
    align-items: center;
    justify-content: center;
    img {
        width: 50%;
        height: 50%;
    }
    width: 100%;

`;

export const RightContent = styled(Col)`
  display: flex;
  height: 100vh;
  /* align-items: center; */
  flex-direction: column;
  /* align-content: space-between; */
  justify-content: space-around;
  background-color: #fae9ea;
  form {
    animation: ${appearFromLeft} 1s;
  }
`;

export const FormContent = styled.div`
  justify-self: center;
  align-self: center;
  width: 60%;
  > div {
    display: flex;
    justify-content: center;
  }
`;

export const ButtonLinkArea = styled.div`
animation: ${appearFromLeft} 1s;
  margin: auto;

  h1,
  h2 {
    text-align: left;
  }
  h1 {
    color: #004fd8;
    font-size: 2.4rem;
    font-weight: 700;
  }

  .home {
    color: #6d6d6d;
  }

  h2 {
    color: #6d6d6d;

    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  a {
    display: flex;

    text-decoration: none;

    width: 80%;

    height: 7rem;

    box-shadow: 0px 1px 3px #00000033;
    border-radius: 4px;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }

    & + a {
      margin-top: 1rem;
    }

    > div {
      padding: 0 1rem;
    }
    > div h1 {
      font-size: 1.5rem;
    }

    > div p {
      text-align: left;
      color: #757575;
    }
  }
`;
export const FooterLogin = styled.div`
    bottom: 0;
    padding-left: 100px;
    padding-right: 100px;
    text-align: center;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto; 
    align-items: center;
    display: block;
`;