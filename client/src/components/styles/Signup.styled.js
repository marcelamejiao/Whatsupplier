import styled from 'styled-components';

export const SignupBody = styled.div`
    display: flex;
    flex-direction: row;
    padding: 40px;
    width: 100%;
    height: 800px;
    .card{
        padding: 20px;
        width: 50%;
        border: none;
    }
    img{
        width:50%;
    }
    p{
        margin: 0;
    }
    form{
        display: flex;
        flex-direction: column;
        > input{
            margin: 10px;
        }
        button{
            width: 17rem;
            left: 40%;
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
    flex-direction: column;
    .card{
       width: 100%; 
    }    
    img{
        display:none;
    }
    form {
        button{
            margin-left: 10%;
        }
    }
  
  }
`