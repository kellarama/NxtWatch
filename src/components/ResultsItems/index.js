import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../context/ThemeContext'
import {ListItemEach, TitleElement, NameElement} from './styledComponents'
import './index.css'

const ResultItems = props => {
  const {eachItem} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = eachItem

  const {profileImageUrl, name} = channel

  const getPublishedDate = () => formatDistanceToNow(new Date(publishedAt))

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isMode} = value

        return (
          <Link to={`/videos/${id}`} className="link-router">
            <ListItemEach>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-image"
              />
              <div className="logo-and-title">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="profile-image-logo"
                />
                <TitleElement isMode={isMode}>{title}</TitleElement>
              </div>
              <NameElement>{name}</NameElement>
              <div className="flex-bottom-card">
                <p className="margin">{viewCount} views </p>
                <p>*{getPublishedDate()}</p>
              </div>
            </ListItemEach>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default ResultItems
