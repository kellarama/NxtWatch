import styled from 'styled-components'

export const NavElement = styled.nav`
  padding: 15px;
  background-color: ${props => (props.isMode ? '#181818' : '#ffffff')};
  margin: auto;
  display: flex;
`
export const HeaderCard = styled.div`
  padding-left: 10px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
`
export const HeaderCardList = styled.ul`
  padding-left: 10px;
  width: 50%;
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
`
export const HeaderCompanyLogo = styled.img`
  width: 120px;
  align-self: center;
  @media (max-width: 576px) {
    width: 80px;
  }
`
export const HeaderList = styled.li`
  margin-right: 10px;
`
export const HeaderButtonMode = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  align-self: center;
`
export const HeaderProfileImage = styled.img`
  width: 37px;
  @media (max-width: 576px) {
    width: 27px;
  }
`
export const LogoutButton = styled.button`
  background-color: transparent;
  height: 30px;
  width: 100px;
  color: ${props => (props.isMode ? '#ffffff' : '#3b82f6')};
  border-color: ${props => (props.isMode ? '#ffffff' : '#3b82f6')};
  border-radius: 10px;
  cursor: pointer;
  border-width: 1px;
  @media (max-width: 576px) {
    width: 80px;
    height: 25px;
  }
`
export const PopupContainer = styled.div`
  width: 300px;
  height: 150px;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-family: 'roboto';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itemsl: center;
  background-color: ${props => (props.isMode ? '#000000' : '#ffffff')};
  color: ${props => (props.isMode ? '#ffffff' : '#000000')};
  @media (max-width: 576px) {
    width: 200px;
    height: 100px;
    font-size: 14px;
  }
`
