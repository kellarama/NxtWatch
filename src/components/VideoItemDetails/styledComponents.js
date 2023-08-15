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
  font-size: 20px;
  font-family: 'Roboto';
  @media (max-width: 576px) {
    font-size: 15px;
  }
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

export const ButtonLike = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 10px;
  font-size: 18px;
  color: ${props => (props.isLikeBtn ? '#2563eb' : '#64748b')};
`
export const ButtonDislike = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 10px;
  font-size: 18px;
  color: ${props => (props.isDisLikeBtn ? '#2563eb' : '#64748b')};
`
