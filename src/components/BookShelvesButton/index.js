import './index.css'
const BookShelvesButton = props => {
  const {btnText, onChangeActiveCard, isActive} = props
  const {id, value, label} = btnText
  const onChangeActive = () => {
    onChangeActiveCard(value)
  }
  const isTrueClass = isActive ? 'book-btn-filter2' : 'book-btn-filter'
  return (
    <li className="book-btn-list-container">
      <button className={isTrueClass} type="button" onClick={onChangeActive}>
        {label}
      </button>
    </li>
  )
}

export default BookShelvesButton
