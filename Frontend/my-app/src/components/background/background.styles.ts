import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100%;

  .background {
    height: 100%;
    img {
      width: 100%;
      filter: brightness(60%);
    }
  }
  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    .title {
      color: white;
      h1 {
        font-size: 3rem;
        letter-spacing: 0.2rem;
      }
      p {
        text-align: center;
        padding: 0 30vw;
        margin-top: 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 980px) {
    height: 25rem;
    .background {
      background-color: palegreen;
      img {
        height: 100%;
      }
    }
  }
`;

export const Glass = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.5rem;
  h2{
    margin-bottom: 30px;
    color: aqua;
  }
  p{
    font-size: 25px;
    color: #ebeb07;
  }
  @media only screen and (min-width: 360px) and (max-width: 1150px) {
    width: 50vw;
    height: 40vh;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 3px;
    line-height: 1.4em;
    p{
      font-size: 16px;
    }
    h2{
      margin-bottom: 10px;
      font-size: smaller;
    }
  }

  @media only screen and (min-width: 1000px)  and (max-width: 1150px) {
    width: 50vw;
    height: 40vh;
     p{
      font-size: 20px;
    }
    h2{
      margin-bottom: 20px;
      font-size: large;
    }
  }
`;
