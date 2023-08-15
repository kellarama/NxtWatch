import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {HiSun} from 'react-icons/hi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

import {
  NavElement,
  HeaderCard,
  HeaderCompanyLogo,
  HeaderCardList,
  HeaderList,
  HeaderButtonMode,
  HeaderProfileImage,
  LogoutButton,
  PopupContainer,
} from './styledComponents'

const Header = props => {
  const LogoutButtonClick = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isMode, changeMode} = value
        const imageUrl = isMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const clickToChangeMode = () => {
          changeMode()
        }

        return (
          <NavElement isMode={isMode}>
            <HeaderCard>
              <Link to="/" className="link-logo">
                <HeaderCompanyLogo src={imageUrl} alt="website logo" />
              </Link>
            </HeaderCard>
            <HeaderCardList>
              <HeaderList>
                <HeaderButtonMode
                  type="button"
                  onClick={clickToChangeMode}
                  data-testid="theme"
                >
                  {isMode ? (
                    <HiSun fill="#ffffff" className="light" />
                  ) : (
                    <FaMoon className="dark" />
                  )}
                </HeaderButtonMode>
              </HeaderList>
              <HeaderList>
                <HeaderButtonMode type="button">
                  <HeaderProfileImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </HeaderButtonMode>
              </HeaderList>
              <HeaderList>
                <div>
                  <Popup
                    modal
                    trigger={
                      <LogoutButton type="button" isMode={isMode}>
                        Logout
                      </LogoutButton>
                    }
                  >
                    {close => (
                      <>
                        <PopupContainer isMode={isMode}>
                          <p>Are you sure, you want to logout?</p>
                          <div>
                            <button
                              className="btn-cancel"
                              type="button"
                              onClick={() => close()}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn-confirm"
                              type="button"
                              onClick={LogoutButtonClick}
                            >
                              Confirm
                            </button>
                          </div>
                        </PopupContainer>
                      </>
                    )}
                  </Popup>
                </div>
              </HeaderList>
            </HeaderCardList>
          </NavElement>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Header)
