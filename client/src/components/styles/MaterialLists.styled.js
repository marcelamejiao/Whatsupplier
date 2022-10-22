import styled from 'styled-components';


export const Container = styled.div`
    padding: 30px;
        margin-top: 1%;
        margin-left: 7%;
        Table{
            margin-top: 2%;
            thead{
            background-color: #569ec2;
            color: #ffff;
        }
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-left: 0;
  }
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
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
    .btn{
        background-color: #569ec2; 
    }
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
`