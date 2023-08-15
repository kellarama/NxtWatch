import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'

class App extends Component {
  state = {isMode: false, saveVideoList: []}

  changeMode = () => {
    this.setState(prevState => ({isMode: !prevState.isMode}))
  }

  addToSave = resultList => {
    this.setState(prevState => ({
      saveVideoList: [...prevState.saveVideoList, resultList],
    }))
  }

  render() {
    const {isMode, saveVideoList} = this.state
    return (
      <>
        <ThemeContext.Provider
          value={{
            isMode,
            changeMode: this.changeMode,
            saveVideoList,
            addToSave: this.addToSave,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </ThemeContext.Provider>
      </>
    )
  }
}
export default App
