import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <Link to="/" className="linker-pages">
        <img
          src="https://res.cloudinary.com/dglv9osd0/image/upload/v1743130825/Group_7731_1_p1e6pi.png"
          className="header-book-img"
          alt="website logo"
        />
      </Link>
      <div className="header-sider">
        <ul className="unorder-list">
          <Link to="/" className="linker-pages">
            <li className="home-list">Home</li>
          </Link>
          <Link to="/shelf" className="linker-pages">
            <li className="book-list">Bookshelves</li>
          </Link>
        </ul>
        <button className="lagout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
        <img
          src="https://res.cloudinary.com/dglv9osd0/image/upload/v1746788906/icon_1_yq2gly.png"
          className="icon-img"
        />
      </div>
    </nav>
  )
}

export default withRouter(Header)
