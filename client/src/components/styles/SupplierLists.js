import styled from 'styled-components';


export const Container = styled.div`
    padding: 20px;
    .table{
        margin: 20px 0;
        thead{
            background-color: #569ec2;
            color: #ffff;
        }
    }
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    button{
        width: 10rem;
        margin: 3px;
        background-color: #569ec2;
        color: #ffff;
        border: 0px;
        height: 3rem;
        border-radius: 4px;
    }
`

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
    justify-content: space-around;
`