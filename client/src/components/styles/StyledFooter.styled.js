import styled from "styled-components";

export const StyledFooter = styled.div`
  background-color: ${({ theme }) => theme.colors.footer};
  position: fixed;
  height: 50px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
  display: flex;
  p {
    flex-grow: 2;
    padding-top: 10px;
    padding-left: 50px;
    color: #ffffff;
    opacity: 1;
  }
  section {
    flex-grow: 2;
    padding-top: 10px;
    padding-left: 50px;
    margin-left: 5px;
    a {
      color: #ffff;
      padding-left: 50px;
      margin-left: 5px;
    }
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    p {
      padding-left: 10px;
      display: none;
    }
    section {
      padding-left: 0px;
    }
  }
`;
