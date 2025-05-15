import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'
const BookShelvesItems = props => {
  const {details} = props
  const {title, rating, readStatus, authorName, coverPic, id} = details
  return (
    <Link to={`/books/${id}`} className="link-book-details">
      <li className="book-list-container">
        <img src={coverPic} className="book-list-img" />
        <div className="book-list-card">
          <h1 className="book-list-card-heading">{title}</h1>
          <p className="book-list-card-pargraph">{authorName}</p>
          <div className="book-list-card-sider">
            <p className="book-list-card-discprtion-rating">Avg Rating</p>
            <BsFillStarFill className="start-icon-img-list" />
            <p className="book-list-card-discprtion-rating">{rating}</p>
          </div>
          <p className="book-list-card-pargraph3">Status: {readStatus}</p>
        </div>
      </li>
    </Link>
  )
}

export default BookShelvesItems
