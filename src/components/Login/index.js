import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'

import {
  MainContainer,
  FormElement,
  CardImageElement,
  CardElement,
  CompanyLogo,
  LabelElement,
  InputElement,
  CheckboxElement,
  ButtonElement,
  ParaElement,
  CheckBoxContainer,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isErrMsg: false,
    errMsg: '',
    isShowPd: false,
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  setJwtToken = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  verifyUserApi = async () => {
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      this.setJwtToken(data.jwt_token)
    } else {
      this.setState({isErrMsg: true, errMsg: data.error_msg})
    }
  }

  submitForm = event => {
    event.preventDefault()
    this.verifyUserApi()
  }

  showPassword = () => {
    this.setState(prevState => ({isShowPd: !prevState.isShowPd}))
  }

  getLoginForm = isMode => {
    const {username, password, isErrMsg, errMsg, isShowPd} = this.state

    const type = isShowPd ? 'text' : 'password'

    const imageUrl = isMode
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

    return (
      <FormElement isMode={isMode} onSubmit={this.submitForm}>
        <CardImageElement>
          <CompanyLogo src={imageUrl} alt="website logo" />
        </CardImageElement>

        <CardElement>
          <LabelElement htmlFor="username" isMode={isMode}>
            USERNAME
          </LabelElement>
          <InputElement
            type="input"
            id="username"
            value={username}
            placeholder="Username"
            isMode={isMode}
            onChange={this.getUsername}
          />
        </CardElement>
        <CardElement>
          <LabelElement htmlFor="password" isMode={isMode}>
            PASSWORD
          </LabelElement>
          <InputElement
            type={type}
            id="password"
            value={password}
            placeholder="Password"
            isMode={isMode}
            onChange={this.getPassword}
          />
        </CardElement>

        <CheckBoxContainer>
          <CheckboxElement
            type="checkbox"
            id="checkbox"
            onChange={this.showPassword}
          />
          <LabelElement isMode={isMode} htmlFor="checkbox">
            Show Password
          </LabelElement>
        </CheckBoxContainer>

        <CheckBoxContainer>
          <ButtonElement type="submit">Login</ButtonElement>
        </CheckBoxContainer>

        {isErrMsg && <ParaElement>*{errMsg}</ParaElement>}
      </FormElement>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isMode} = value

          return (
            <MainContainer isMode={isMode}>
              {this.getLoginForm(isMode)}
            </MainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
