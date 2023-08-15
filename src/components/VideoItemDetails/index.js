import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {
  AiFillHome,
  AiTwotoneFire,
  AiFillSave,
  AiTwotoneLike,
  AiFillDislike,
} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import ThemeContext from '../../context/ThemeContext'
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
  ButtonLike,
  ButtonDislike,
} from './styledComponents'

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

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    resultList: [],
    isLikeBtn: false,
    isDisLikeBtn: false,
  }

  componentDidMount() {
    this.getAnApiCall()
  }

  getAnApiCall = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`

    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      const videoDetails = data.video_details

      const convertedData = {
        id: videoDetails.id,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        thumbnailUrl: videoDetails.thumbnail_url,
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        viewCount: videoDetails.view_count,
        publishedAt: videoDetails.published_at,
        description: videoDetails.description,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        resultList: convertedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSideBar = isMode => (
    <SideBarList isMode={isMode}>
      <Link to="/" className="link-logo">
        <ListItemSideBar key={sideBarListItems[0].id}>
          <ButtonSideBar type="button">
            <AiFillHome className="grey" />
          </ButtonSideBar>
          <ParaElementHome isMode={isMode}>Home</ParaElementHome>
        </ListItemSideBar>
      </Link>

      <Link to="/trending" className="link-logo">
        <ListItemSideBar key={sideBarListItems[1].id}>
          <ButtonSideBar type="button">
            <AiTwotoneFire className="grey" />
          </ButtonSideBar>
          <ParaElementHome isMode={isMode}>Trending</ParaElementHome>
        </ListItemSideBar>
      </Link>

      <Link to="/gaming" className="link-logo">
        <ListItemSideBar key={sideBarListItems[2].id}>
          <ButtonSideBar type="button">
            <SiYoutubegaming className="grey" />
          </ButtonSideBar>
          <ParaElementHome isMode={isMode}>Gaming</ParaElementHome>
        </ListItemSideBar>
      </Link>

      <Link to="/saved-videos" className="link-logo">
        <ListItemSideBar key={sideBarListItems[3].id}>
          <ButtonSideBar type="button">
            <AiFillSave className="grey" />
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

  likeBtnClicked = () => {
    this.setState(prevState => ({
      isLikeBtn: !prevState.isLikeBtn,
      isDisLikeBtn: false,
    }))
  }

  dislikeBtnClicked = () => {
    this.setState(prevState => ({
      isDisLikeBtn: !prevState.isDisLikeBtn,
      isLikeBtn: false,
    }))
  }

  getItemsFromComponent = (isMode, addToSave) => {
    const {resultList, isLikeBtn, isDisLikeBtn} = this.state
    const {
      title,
      videoUrl,
      // thumbnailUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = resultList
    const {name, profileImageUrl, subscriberCount} = channel

    const getPublishedDate = () => formatDistanceToNow(new Date(publishedAt))

    const saveVideoBtn = () => {
      addToSave(resultList)
    }

    return (
      <div className="result-main-list">
        <ReactPlayer url={videoUrl} controls width="100%" />
        <div className="details-card">
          <ParaElementHome isMode={isMode}>{title}</ParaElementHome>
          <div className="flex-views">
            <p className="view">{viewCount}</p>
            <p className="view">{getPublishedDate()}</p>
            <div className="like-save-card">
              <ButtonLike
                className="btn-"
                type="button"
                isLikeBtn={isLikeBtn}
                onClick={this.likeBtnClicked}
              >
                <AiTwotoneLike className="icon-size" />
                Like
              </ButtonLike>
              <ButtonDislike
                className="btn-"
                type="button"
                isDisLikeBtn={isDisLikeBtn}
                onClick={this.dislikeBtnClicked}
              >
                <AiFillDislike className="icon-size" />
                Dislike
              </ButtonDislike>
              <button className="btn-" type="button" onClick={saveVideoBtn}>
                <AiFillSave className="icon-size" />
                Save
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="subscribers-card">
          <img src={profileImageUrl} alt="channel logo" className="sub-img" />
          <div>
            <ParaElementHome isMode={isMode}>{name}</ParaElementHome>
            <p className="view">{subscriberCount}</p>
          </div>
        </div>
        <div className="description-card">
          <ParaElementHome isMode={isMode}>{description}</ParaElementHome>
        </div>
      </div>
    )
  }

  getResultsContainer = (isMode, addToSave) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getItemsFromComponent(isMode, addToSave)
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
          const {isMode, addToSave} = value

          return (
            <>
              <Header />
              <MainContainerHome data-testid="home" isMode={isMode}>
                {this.getSideBar(isMode)}
                <div className="banner-and-result-card">
                  {this.getResultsContainer(isMode, addToSave)}
                </div>
              </MainContainerHome>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
