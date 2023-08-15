import styled from 'styled-components'

export const MainContainerHome = styled.div`
  display: flex;
  background-color: ${props => (props.isMode ? '#181818' : '#f9f9f9')};
`

export const SideBarList = styled.ul`
  width: 30%;
  list-style-type: none;
  padding: 15px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
export const ListItemSideBar = styled.li`
  display: flex;
  margin-bottom: 10px;
`
export const ButtonSideBar = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`

export const ParaElementHome = styled.p`
  color: ${props => (props.isMode ? '#ffffff' : '#000000')};
  font-size: 16px;
  font-family: 'Roboto';
`
export const BottomCard = styled.div`
  color: ${props => (props.isMode ? '#ffffff' : '#000000')};
  padding: 10px;
  font-size: 14px;
  font-family: 'Roboto';
  padding-top: 50%;
`

export const HeadingElementFailure = styled.h1`
  color: ${props => (props.isMode ? '#ffffff' : '#000000')};
  font-size: 24px;
  font-family: 'Roboto';
`
export const ParaElementFailure = styled.p`
  color: #94a3b8;
  font-size: 16px;
  font-family: 'Roboto';
`

export const SearchElement = styled.input`
  background-color: ${props => (props.isMode ? '#000000' : '#ffffff')};
  height: 35px;
  width: 50%;
  border-color: #94a3b8;
  padding-left: 10px;
  color: ${props => (props.isMode ? '#ffffff' : '#000000')};
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
  border-width: 1px;
`

export const SearchButton = styled.button`
  border-width: 1px;
  border-color: #94a3b8;
  background-color: transparent;
  height: 35px;
  width: 50px;
  cursor: pointer;
  margin-top: 20px;
`
