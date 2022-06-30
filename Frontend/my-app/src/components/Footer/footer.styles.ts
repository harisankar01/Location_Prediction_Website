import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 30px;
  margin-top: 0;
  width: 100%;
  box-sizing: border-box;
  background: radial-gradient(circle, rgba(0,123,221,1) 0%, rgba(123,121,207,1) 100%);
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:100%;
    margin: 0 auto;
    img{
      width: 40px;
      height: 40px;
    }
    span{
      margin-left: 30%;
    }
    a{
        text-decoration: none;
        cursor: pointer;
    }
  @media (max-width: 1000px) {
    h2{
      font-size: 16px;
    }
    span{
      margin-left: 0%;
    }
    img{
        width: 30px;
      height: 30px;
    }
  }
`;



