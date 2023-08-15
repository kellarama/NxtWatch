import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {AiFillHome, AiTwotoneFire, AiFillSave} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import GameItems from '../GameItems'
import {
  MainContainerHome,
  SideBarList,
  ListItemSideBar,
  ButtonSideBar,
  ParaElementHome,
  BottomCard,
  HeadingElementFailure,
  ParaElementFailure,
} from './styledComponent'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
}

const sideBarListItems = [
  {id: 'HOME', displayText: 'Home'},
  {id: 'TRENDING', displayText: 'Trending'},
  {id: 'GAMING', displayText: 'Gaming'},
  {id: 'SAVED VIDEOS', displayText: 'Saved videos'},
]

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeSideBarId: sideBarListItems[2].id,
    resultList: [],
  }

  componentDidMount() {
    this.getAnApiCall()
  }

  getAnApiCall = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'

    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      const {videos} = data

      const convertedData = videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        resultList: convertedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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

  onClickFailureBtn = () => {
    this.getAnApiCall()
  }

  getFailureView = isMode => (
    <div className="failure-view">
      <div className="failure-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
          className="failure-img"
        />
        <HeadingElementFailure isMode={isMode}>
          Oops! Something Went Wrong
        </HeadingElementFailure>
        <ParaElementFailure>
          We are having some trouble to complete your request. Please try again
        </ParaElementFailure>
        <button
          className="button-retry"
          type="button"
          onClick={this.onClickFailureBtn}
        >
          Retry
        </button>
      </div>
    </div>
  )

  getLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getItemsFromComponent = () => {
    const {resultList} = this.state

    return (
      <ul className="result-main-list">
        {resultList.map(eachItem => (
          <GameItems eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  getResultsContainer = isMode => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getItemsFromComponent()
      case apiStatusConstants.failure:
        return this.getFailureView(isMode)
      case apiStatusConstants.loading:
        return this.getLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isMode} = value

          return (
            <>
              <Header />
              <MainContainerHome data-testid="home" isMode={isMode}>
                {this.getSideBar(isMode)}
                <div className="banner-and-result-card">
                  <div className="flex-container-trending">
                    <SiYoutubegaming className="to-trending-icon" />
                    <HeadingElementFailure isMode={isMode}>
                      Gaming
                    </HeadingElementFailure>
                  </div>
                  {this.getResultsContainer(isMode)}
                </div>
              </MainContainerHome>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
