import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {ListItemEach, TitleElement} from './styledComponent'
import './index.css'

const GameItems = props => {
  const {eachItem} = props
  const {id, title, thumbnailUrl, viewCount} = eachItem

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
              <TitleElement isMode={isMode}>{title}</TitleElement>

              <p className="margin">{viewCount} views </p>
            </ListItemEach>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GameItems
