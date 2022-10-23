import styled from 'styled-components'

export const Modal = styled.div`
width: 80%;
align-items: center;
background-color: #fff;
border-radius: 15px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
margin: 40px 40px 40px 10%;
padding: 20px;
`

export const Footer = styled.div`
display: flex;
flex-direction: row;

`
export const Button = styled.button`
    width: 10rem;
    margin: 3px;
    background-color: #569ec2;  
    border: 0px;
    height: 3rem;
    border-radius: 4px;
    margin-left: 3%;
    color: #ffff;
    a{
        color: #ffff;
    }
    &:hover{
        text-decoration: underline;
    }
`