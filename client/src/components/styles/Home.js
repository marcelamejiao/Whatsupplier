import styled from 'styled-components';


export const HomeContainer = styled.div`
display: flex;
flex-direction: column;
overflow: auto;
`
export const HomeBanner = styled.div`
padding: 20px;
text-align:center;
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
}`