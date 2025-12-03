import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import HomeSlidList from '../HomeSlidList'
import Header from '../Header'
import FailureBox from '../FailureBox'
import SocialMediaIcons from '../SocialMediaIcons'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Home extends Component {
  state = {topBookList: [], apiStatus: apiStatusConstants.initial}
  componentDidMount() {
    this.getTopProducts()
  }

  getTopProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateDetails = data.books.map(eachList => ({
        id: eachList.id,
        authorName: eachList.author_name,
        coverPic: eachList.cover_pic,
        title: eachList.title,
      }))
      this.setState({
        topBookList: updateDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRest = () => {
    this.getTopProducts()
  }

  renderFailure = () => {
    return <FailureBox renderRest={this.renderRest} />
  }
  renderLoader = () => {
    return (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    )
  }

  renderSuccess = () => {
    const {topBookList} = this.state
    const settings = {
      dots: false,
      slidesToShow: 2,
      slidesToScroll: 1,
    }
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {topBookList.map(eachDeta => (
            <HomeSlidList bookDetails={eachDeta} key={eachDeta.id} />
          ))}
        </Slider>
      </div>
    )
  }

  onGotoBookSheleve = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {topBookList} = this.state
    console.log(topBookList)
    const settings = {
      dots: false,
      slidesToShow: 2,
      slidesToScroll: 1,
    }
    return (
      <div>
        <Header />
        <div className="home-container">
          <div className="home-card">
            <h1 className="home-heading-find-book">
              Find Your Next Favorite Books?
            </h1>
            <p className="home-paragraph-details">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              className="home-books-btn2"
              type="button"
              onClick={this.onGotoBookSheleve}
            >
              Find Books
            </button>
            <div className="home-books-card">
              <div className="home-books-sider">
                <h1 className="home-books-heading">Top Rated Books</h1>
                <button
                  className="home-books-btn"
                  type="button"
                  onClick={this.onGotoBookSheleve}
                >
                  Find Books
                </button>
              </div>
              {this.renderAllProducts()}
            </div>
            <SocialMediaIcons />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
