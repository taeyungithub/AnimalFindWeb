import styled from "@emotion/styled";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";

export const Wrapper = styled.div`
  width: 1000px;
  /* height: 1847px; */
  border: 1px solid black;
  margin: 100px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 4px solid black;
  border-radius: 6px;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
`;

export const Title = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: bold;
`;

export const WriterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
`;

export const Writer = styled.input`
  width: 480px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
`;

export const Label = styled.div`
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
`;

export const InputWrapper = styled.div`
  padding-top: 20px;
`;

export const Subject = styled.input`
  width: 480px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
`;

export const Contents = styled.textarea`
  width: 900px;
  height: 200px;
  padding-left: 16px;
  padding: 14px;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
`;

export const ZipcodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Zipcode = styled.input`
  width: 95px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
`;

export const SearchButton = styled.button`
  width: 124px;
  height: 52px;
  margin-left: 16px;
  background-color: black;
  cursor: pointer;
  color: white;
  border-radius: 6px;
`;

export const Address = styled.input`
  width: 900px;
  height: 52px;
  margin-top: 16px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
`;

export const Youtube = styled.input`
  width: 996px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 996px;
  padding-top: 40px;
`;

export const UploadButton = styled.input`
  width: 78px;
  height: 78px;
  background-color: #bdbdbd;
  margin-right: 24px;
  outline: none;
  border: none;
  cursor: pointer;
  opacity: 1;
`;

export const OptionWrapper = styled.div`
  width: 996px;
  padding-top: 40px;
`;

export const RadioButton = styled.input`
  cursor: pointer;
`;

export const RadioLabel = styled.label`
  margin-left: 8px;
  margin-right: 20px;
  font-weight: 500;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 80px;
`;

export const CancelButton = styled.button`
  width: 179px;
  height: 52px;
  background-color: #bdbdbd;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  width: 179px;
  height: 52px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
  border-radius: 6px;
  background-color: ${(props) => (props.isActive ? "yellow" : "none")};
`;

export const Error = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: red;
`;

export const AddressModal = styled(Modal)``;

export const AddressSearchInput = styled(DaumPostcode)``;
