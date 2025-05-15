import {Link} from 'react-router-dom'
import './index.css'
const HomeSlidList = props => {
  const {bookDetails} = props
  const {id, authorName, coverPic, title} = bookDetails
  return (
    <Link to={`/books/${id}`} className="linking-home-img">
      <div className="silde-container">
        <img src={coverPic} className="slid-home-img" />
        <h1 className="silde-heading">{title}</h1>
        <p className="slid-paragraph">{authorName}</p>
      </div>
    </Link>
  )
}

export default HomeSlidList
