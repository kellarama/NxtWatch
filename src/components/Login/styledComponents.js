import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.isMode ? '#424242' : '#ffffff')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const FormElement = styled.form`
  background-color: ${props => (props.isMode ? '#000000' : '#ffffff')};
  width: 40%;
  box-shadow: 2px 2px 5px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    width: 80%;
  }
`
export const CardImageElement = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
export const CardElement = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 80%;
  align-self: center;
`
export const CompanyLogo = styled.img`
  width: 100px;
  margin-right: 5px;
`
export const LabelElement = styled.label`
  color: ${props => (props.isMode ? '#ffffff' : '#000000')};
  font-family: 'Roboto';
  font-size: 15px;
  margin-bottom: 8px;
`
export const InputElement = styled.input`
  width: 100%;
  height: 35px;
  padding-left: 10px;
  color: ${props => (props.isMode ? '#ffffff' : '#000000')};
  background-color: ${props => (props.isMode ? '#000000' : '#ffffff')};
  border: 1px solid #3b82f6;
  border-radius: 10px;
`

export const ParaElement = styled.p`
  color: #ff0b37;
  font-size: 18px;
  font-family: 'Roboto';
  align-self: center;
`
export const CheckboxElement = styled.input`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`
export const ButtonElement = styled.button`
  border: none;
  color: #ffffff;
  background-color: #3b82f6;
  height: 35px;
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`
export const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-self: center;
`
