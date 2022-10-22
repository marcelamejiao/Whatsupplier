import styled from 'styled-components'

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 40px;
    width: 100%;
    height: 600px;
    .card{
        padding: 20px;
        width: 50%;
        border: none;
    }
    img{
        width:50%;
    }
    form{
        display: flex;
        flex-direction: column;
        line-height: 2.0;
        > input{
            margin: 10px;
        }
        button{
            width: 17rem;
            margin-top: 10%;
            margin-left: 20%;
            background-color: #569ec2;
            color: #ffff;
            border:0px ;
            height: 3rem;
            border-radius: 4px;
        }
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
    
  }
`