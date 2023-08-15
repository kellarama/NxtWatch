import styled from 'styled-components'

export const ListItemEach = styled.li`
  width: 300px;
  margin: 10px;
  padding-bottom: 20px;
  @media (max-width: 576px) {
    width: 240px;
  }
`
export const TitleElement = styled.p`
  color: ${props => (props.isMode ? '#ffffff' : '#000000')};
  font-size: 18px;
  font-family: 'roboto';
  @media (max-width: 576px) {
    font-size: 15px;
  }
`
