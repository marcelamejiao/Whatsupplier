import styled from 'styled-components';
import image from '../../images/3043416563.png'

export const MainPageContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 700px;
    background-image: url(${image});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    line-height: 650px;
    p {
        padding: 20px;
        width: 85%;
        opacity: 1;
        color: #ffffff;
        display: inline-block;
        line-height: normal;
        vertical-align: middle;
        font-size: 1.5rem;
        font-family: Roboto;
        margin-top: -20%;
        letter-spacing: 1.5px;
    }
    button{
        width: 200px;
        height: 40px;
        position: absolute;
        line-height: normal;
        top: 50%;
        left: 5%;
        background-color: #569ec2;
        border: 0;
        color: white;
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
        p{
            margin-top: -60%; 
        }
  }
`

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 20%;
    background-color: #e6e6e6;
    p{
        padding: 20px;
        letter-spacing: 1px;
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`