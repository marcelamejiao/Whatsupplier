import styled from "styled-components";

export const HomeContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
export const HomeBanner = styled.div`
  padding: 20px;
  text-align: center;
`;
export const Button = styled.button`
  width: 10rem;
  margin: 3px;
  background-color: #52bb5edb;
  border: 0px;
  height: 3rem;
  border-radius: 4px;
  a{
    color: #ffff;
  }
`
export const StripeButton = styled.button`
  width: 20rem;
  margin: 3px;
  background-color: #E9AA44;
  border: 0px;
  height: 3rem;
  border-radius: 4px;
  color: #ffff;
`

export const Card = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 40px 0;
  margin-left: 10%;
  padding: 60px;
  display: flex;
  flex-direction: row;
  width: 80%;
  img {
    width: 80%;
  }

  & > div {
    flex: 1;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`;
