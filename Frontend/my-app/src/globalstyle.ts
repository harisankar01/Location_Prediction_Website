import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
 } 
`;

export const Container = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 50px;
  padding-left: 50px;
  margin-top: 50px ;
  @media screen and (max-width: 1000px) and (min-width: 360px){
    padding-right: 20px;
    margin-top: 100px;
  }
`;
interface Props{
    primary:Boolean,
    big:Boolean,
    fontBig:Boolean,
    onclick:()=>{}
}

export const Button = styled.button<Props>`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? '#4B59F7' : '#0467FB')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? '#0467FB' : '#4B59F7')};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export default GlobalStyle;