import styled from 'styled-components';


export const Container = styled.div`
    padding: 30px;
    Table{
        border-collapse: collapse;
        margin: 25px 50px 25px 50px;
        min-width: 400px;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        text-align: center;
        thead {
            background-color: #569ec2;
            color: #ffff;
        }
        tbody {
            td {
                width: 25%;
            }
            tr:hover {
            background-color: #dce0e6;
            }
        }    
    }
    .editInventory{
        width: 10rem;
        background-color: #569ec2;
        color: #ffff;
        border: 0px;
        height: 3rem;
        border-radius: 4px;
        a, a:hover, a:visited, a:active{
            color: inherit;
            text-decoration: none;
        }
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
        .table{
            margin-left: -13px;
        }
  }
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    button{
        width: 10rem;
        margin: 3px;
        background-color: #52bb5edb;
        color: #ffff;
        border: 0px;
        height: 3rem;
        border-radius: 4px;
        margin-left: 2%;
    }
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
`
export const NameLink = styled.div`
    vertical-align: top;
    border-top: 0px solid #dee2e6;
    padding: 0.75rem;
    a{
        color: black;
        text-decoration: underline;
    }
    a:hover{
        font-size: 1.3rem;
    }
`