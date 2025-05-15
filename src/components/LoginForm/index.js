import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
    this.setState({password: '', username: ''})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }
  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-div-container">
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dglv9osd0/image/upload/v1743126988/Rectangle_1467_dffpmz.png"
            className="coffe-img"
          />
          <img
            src="https://res.cloudinary.com/dglv9osd0/image/upload/v1743130727/Ellipse_99_faihou.png"
            className="small-coffe-img"
            alt="login website logo"
          />
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dglv9osd0/image/upload/v1743130825/Group_7731_1_p1e6pi.png"
              className="book-hub-img"
              alt="website login"
            />
            <div className="input-container">
              <label htmlFor="name" className="form-label-text">
                Username*
              </label>
              <input
                type="text"
                id="name"
                className="user-input"
                value={username}
                onChange={this.onChangeName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="form-label-text">
                Password*
              </label>
              <input
                type="password"
                id="password"
                className="user-input"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="form-submit-btn">
              Login
            </button>
            {showError && <p className="error-paragraph">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
