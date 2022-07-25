import styled from "styled-components";
import { Form } from "antd";

export const UploadContainer = styled.input`
  border-radius: 3px;
`;

export const FormContainer = styled(Form)`
  .ant-form-item {
    &:nth-last-of-type(1) {
        margin-bottom: 0;
      .ant-form-item-control-input-content {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;
