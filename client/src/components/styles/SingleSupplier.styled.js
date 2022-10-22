import styled from 'styled-components'

export const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const SupplierContainer = styled.div`
    padding: 40px;
    p{
        width: 20px;
    }
    input{
        width: 70%;
        margin-left: 15%;
    }
    .card-header{
        background-color: #ffffff;
    }
`

export const MaterialContainer = styled.div`
    padding: 40px;
    button{
        margin-left: 40%;
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
        button{
        margin-left: 0;
    }
    }
`