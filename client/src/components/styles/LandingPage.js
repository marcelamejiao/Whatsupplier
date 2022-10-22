import styled from 'styled-components';
import image from '../../images/3043416563.png'

export const MainPageContainer = styled.div`
    width:100%;

`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 50%;
    background-image: url(${image});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    line-height: 650px;
    p {
        padding: 20px;
        width: 75%;
        opacity: 1;
        color: #ffffff;
        display: inline-block;
        line-height: normal;
        vertical-align: middle;
        font-size: 1.5rem;
        font-family: Roboto;

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
`

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #e6e6e6;
    p{
        padding: 20px
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`