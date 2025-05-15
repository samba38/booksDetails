import {BsFillStarFill} from 'react-icons/bs'
import './index.css'
const BookDetailsItem = props => {
  const {detail} = props
  const {
    id,
    authorName,
    coverPic,
    aboutBook,
    rating,
    readStatus,
    title,
    aboutAuthor,
  } = detail
  return (
    <div className="book-details-card">
      <div className="book-details-card-main">
        <img src={coverPic} className="book-details-card-img" alt={title}/>
        <div className="book-details-card-discprtion">
          <h1 className="book-details-card-discprtion-heading">{title}</h1>
          <p className="book-details-card-discprtion-paragraph">{authorName}</p>
          <div className="book-details-card-sider">
            <p className="book-details-card-discprtion-rating">Avg Rating</p>
            <BsFillStarFill className="start-icon-img" />
            <p className="book-details-card-discprtion-rating">{rating}</p>
          </div>
          <p className="book-details-card-discprtion-status">
            Status: <span className="book-details-span">this</span>
          </p>
        </div>
      </div>
      <hr className="horizantal-line" />
      <div>
        <h1 className="book-details-author-heading">About Author</h1>
        <p className="book-details-author-pargraph">{aboutAuthor}</p>
        <div className="about-book-card">
          <h1 className="book-details-author-heading">About Book</h1>
          <p className="book-details-author-pargraph">{aboutBook}</p>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsItem
