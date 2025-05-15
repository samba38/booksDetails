import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dglv9osd0/image/upload/v1744343781/Group_7484_qeguon.png"
      className="not-found-img"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-paragraph">
      we are sorry, the page you requested could not be found,Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="not-found-btn" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
