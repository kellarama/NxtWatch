import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome, AiTwotoneFire, AiFillSave} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import ThemeContext from '../../context/ThemeContext'
import ResultItems from '../ResultsItems'
import Header from '../Header'
import {
  MainContainerHome,
  SideBarList,
  ListItemSideBar,
  ButtonSideBar,
  ParaElementHome,
  BottomCard,
  HeadingElementFailure,
  ParaElementFailure,
} from './styledComponents'

import './index.css'

const sideBarListItems = [
  {id: 'HOME', displayText: 'Home'},
  {id: 'TRENDING', displayText: 'Trending'},
  {id: 'GAMING', displayText: 'Gaming'},
  {id: 'SAVED VIDEOS', displayText: 'Saved videos'},
]

class SavedVideos extends Component {
  state = {
    activeSideBarId: sideBarListItems[3].id,
  }

  getActiveList = (activeId, sideBarId) => {
    if (activeId === sideBarId) {
      return 'hight-light'
    }
    return null
  }

  updateActiveId = id => {
    this.setState({activeSideBarId: id})
  }

  getSideBar = isMode => {
    const {activeSideBarId} = this.state
    return (
      <SideBarList isMode={isMode}>
        <Link to="/" className="link-logo">
          <ListItemSideBar
            key={sideBarListItems[0].id}
            className={this.getActiveList(
              activeSideBarId,
              sideBarListItems[0].id,
            )}
          >
            <ButtonSideBar
              type="button"
              onClick={() => this.updateActiveId(sideBarListItems[0].id)}
            >
              <AiFillHome
                className={
                  activeSideBarId === sideBarListItems[0].id ? 'red' : 'grey'
                }
              />
            </ButtonSideBar>
            <ParaElementHome isMode={isMode}>Home</ParaElementHome>
          </ListItemSideBar>
        </Link>

        <Link to="/trending" className="link-logo">
          <ListItemSideBar
            key={sideBarListItems[1].id}
            className={this.getActiveList(
              activeSideBarId,
              sideBarListItems[1].id,
            )}
          >
            <ButtonSideBar
              type="button"
              onClick={() => this.updateActiveId(sideBarListItems[1].id)}
            >
              <AiTwotoneFire
                className={
                  activeSideBarId === sideBarListItems[1].id ? 'red' : 'grey'
                }
              />
            </ButtonSideBar>
            <ParaElementHome isMode={isMode}>Trending</ParaElementHome>
          </ListItemSideBar>
        </Link>

        <Link to="/gaming" className="link-logo">
          <ListItemSideBar
            key={sideBarListItems[2].id}
            className={this.getActiveList(
              activeSideBarId,
              sideBarListItems[2].id,
            )}
          >
            <ButtonSideBar
              type="button"
              onClick={() => this.updateActiveId(sideBarListItems[2].id)}
            >
              <SiYoutubegaming
                className={
                  activeSideBarId === sideBarListItems[2].id ? 'red' : 'grey'
                }
              />
            </ButtonSideBar>
            <ParaElementHome isMode={isMode}>Gaming</ParaElementHome>
          </ListItemSideBar>
        </Link>

        <Link to="/saved-videos" className="link-logo">
          <ListItemSideBar
            key={sideBarListItems[3].id}
            className={this.getActiveList(
              activeSideBarId,
              sideBarListItems[3].id,
            )}
          >
            <ButtonSideBar
              type="button"
              onClick={() => this.updateActiveId(sideBarListItems[3].id)}
            >
              <AiFillSave
                className={
                  activeSideBarId === sideBarListItems[3].id ? 'red' : 'grey'
                }
              />
            </ButtonSideBar>
            <ParaElementHome isMode={isMode}>Saved videos</ParaElementHome>
          </ListItemSideBar>
        </Link>
        <BottomCard isMode={isMode}>
          <p>CONTACT US</p>
          <div className="flex-share">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              className="img-share"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              className="img-share"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
              alt="linked in logo"
              className="img-share"
            />
          </div>
          <p>Enjoy! Now to see your channels and recommendations!</p>
        </BottomCard>
      </SideBarList>
    )
  }

  getNoSavedVideos = isMode => (
    <div className="failure-view">
      <div className="failure-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
          className="failure-img"
        />
        <HeadingElementFailure isMode={isMode}>
          No saved videos found
        </HeadingElementFailure>
        <ParaElementFailure>
          Save your videos by clicking a button
        </ParaElementFailure>
      </div>
    </div>
  )

  getItemsFromComponent = saveVideoList => (
    <>
      {saveVideoList.length > 0 ? (
        <ul className="result-main-list">
          {saveVideoList.map(eachItem => (
            <ResultItems eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      ) : (
        this.getNoSavedVideos()
      )}
    </>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isMode, saveVideoList} = value

          return (
            <>
              <Header />
              <MainContainerHome data-testid="home" isMode={isMode}>
                {this.getSideBar(isMode)}
                <div className="banner-and-result-card">
                  <div className="flex-container-trending">
                    <AiFillSave className="to-trending-icon" />
                    <HeadingElementFailure isMode={isMode}>
                      Saved Videos
                    </HeadingElementFailure>
                  </div>
                  {this.getItemsFromComponent(saveVideoList)}
                </div>
              </MainContainerHome>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
