import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  .nav-wrapper {
    .nav-left {
      min-width: 500px;
      .nextui-input-main-container {
        float: right;
        width: 80%;
        .nextui-input {
          min-width: 80%;
        }
        .nextui-input-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .nav-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 5px;
    }
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
