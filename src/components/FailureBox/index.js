import './index.css'
const FailureBox = props => {
  const {renderRest} = props
  const onChangeRest = () => {
    renderRest()
  }
  return (
    <div className="fail-container">
      <img
        src="https://res.cloudinary.com/dglv9osd0/image/upload/v1743863134/Group_7522_lbwhd9.png"
        className="fail-img"
        alt="failure view"
      />
      <p className="fail-heading">Something went wrong, Please try again.</p>
      <button className="fail-btn" type="button" onClick={onChangeRest}>
        Try Again
      </button>
    </div>
  )
}

export default FailureBox
