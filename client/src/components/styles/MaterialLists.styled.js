import styled from 'styled-components';


export const Container = styled.div`
    padding: 30px;
        .table-wrapper {
            overflow: scroll;
        }
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
        background-color: #52bb5edb;  
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