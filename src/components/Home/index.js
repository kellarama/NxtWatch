import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {
  AiFillHome,
  AiTwotoneFire,
  AiFillSave,
  AiOutlineSearch,
} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {GrClose} from 'react-icons/gr'
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
  SearchElement,
  SearchButton,
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

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeSideBarId: sideBarListItems[0].id,
    isBannerShow: true,
    resultList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getAnApiCall()
  }

  getAnApiCall = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`

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
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
      }))

      console.log(convertedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        resultList: convertedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSearchResults = event => {
    this.setState({searchInput: event.target.value})
  }

  searchButtonClick = () => {
    this.getAnApiCall()
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

  closeBanner = () => {
    this.setState({isBannerShow: false})
  }

  getBannerElement = () => (
    <div className="banner-container" data-testid="banner">
      <div className="logo-and-close-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="next-watch-logo"
        />
        <div className="flex-close-btn">
          <button
            type="button"
            data-testid="close"
            className="close-button"
            onClick={this.closeBanner}
          >
            <GrClose className="cross-btn" />
          </button>
        </div>
      </div>
      <p className="banner-description">
        Buy Nxt Watch Premium prepaid plans with UPI
      </p>
      <button type="button" className="button-banner">
        GET IT NOW
      </button>
    </div>
  )

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

  retryNoProductBtn = () => {
    this.getAnApiCall()
  }

  getNoSearchResults = isMode => (
    <div className="failure-view">
      <div className="failure-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="failure-img"
        />
        <HeadingElementFailure isMode={isMode}>
          No Search results found
        </HeadingElementFailure>
        <ParaElementFailure>
          Try different key words or remove search filter
        </ParaElementFailure>
        <button
          className="button-retry"
          type="button"
          onClick={this.retryNoProductBtn}
        >
          Retry
        </button>
      </div>
    </div>
  )

  getItemsFromComponent = () => {
    const {resultList} = this.state

    return (
      <ul className="result-main-list">
        {resultList.map(eachItem => (
          <ResultItems eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  getAllItems = isMode => {
    const {resultList} = this.state

    return (
      <>
        {resultList.length > 0
          ? this.getItemsFromComponent()
          : this.getNoSearchResults(isMode)}
      </>
    )
  }

  getResultsContainer = isMode => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getAllItems(isMode)
      case apiStatusConstants.failure:
        return this.getFailureView(isMode)
      case apiStatusConstants.loading:
        return this.getLoaderView()
      default:
        return null
    }
  }

  render() {
    const {isBannerShow, searchInput} = this.state
    console.log(searchInput)
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
                  {isBannerShow && this.getBannerElement()}
                  <div className="flex-search">
                    <SearchElement
                      type="search"
                      isMode={isMode}
                      placeholder="Search"
                      onChange={this.getSearchResults}
                    />
                    <SearchButton
                      type="button"
                      data-testid="searchButton"
                      onClick={this.searchButtonClick}
                    >
                      <AiOutlineSearch className="search-icon" />
                    </SearchButton>
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

export default Home
