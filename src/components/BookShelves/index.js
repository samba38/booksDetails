import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import BookShelvesItems from '../BookShelvesItems'
import BookShelvesButton from '../BookShelvesButton'
import FailureBox from '../FailureBox'
import SocialMediaIcons from '../SocialMediaIcons'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class BookShelves extends Component {
  state = {
    cartList: [],
    activeBookCard: bookshelvesList[0].value,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getProductCartItem()
  }

  getProductCartItem = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {cartList, searchInput, activeBookCard} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeBookCard}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(eachList => ({
        id: eachList.id,
        title: eachList.title,
        readStatus: eachList.read_status,
        rating: eachList.rating,
        authorName: eachList.author_name,
        coverPic: eachList.cover_pic,
      }))
      this.setState({
        cartList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChnageInput = event => {
    this.setState({searchInput: event.target.value})
  }
  onChangeSearchAction = event => {
    if (event.key === 'Enter') {
      this.getProductCartItem()
    }
  }
  onSearchBtn = () => {
    this.getProductCartItem()
  }
  onChangeActiveCard = value => {
    this.setState({activeBookCard: value}, this.getProductCartItem)
  }

  renderRest = () => {
    this.getProductCartItem()
  }
  renderProductsList = () => {
    const {cartList, searchInput} = this.state
    const lengthCartList = cartList.length > 0

    return lengthCartList ? (
      <ul className="book-unorder-list">
        {cartList.map(eachBook => (
          <BookShelvesItems details={eachBook} key={eachBook.id} />
        ))}
      </ul>
    ) : (
      <div className="search-notfound-container">
        <img
          src="https://res.cloudinary.com/dglv9osd0/image/upload/v1744339324/Asset_1_1_iijzhp.png"
          className="search-not-img"
          alt="no books"
        />
        <p className="search-notfound-paragraph">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderProductsButtonFilter = () => {
    const {activeBookCard} = this.state
    return (
      <ul className="unorder-btn-filter-list">
        <h1 className="book-btn-heading">Bookshelves</h1>
        {bookshelvesList.map(eachBtn => (
          <BookShelvesButton
            btnText={eachBtn}
            key={eachBtn.id}
            onChangeActiveCard={this.onChangeActiveCard}
            isActive={eachBtn.value === activeBookCard}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => {
    return <FailureBox renderRest={this.renderRest} />
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, activeBookCard} = this.state
    console.log(activeBookCard)
    return (
      <div>
        <Header />
        <div className="bookshel-box-conatainer">
          <div className="all-book-sider">
            <h1 className="bookshel-heading">All Books</h1>
            <div className="bookshel-search-sider">
              <input
                type="search"
                className="bookshel-input"
                onChange={this.onChnageInput}
                onKeyDown={this.onChangeSearchAction}
              />

              <button
                type="button"
                className="search-icon-container"
                testid="searchButton"
                onClick={this.onSearchBtn}
              >
                <BsSearch />
              </button>
            </div>
          </div>
          <div className="filter-Books-container">
            <div>{this.renderProductsButtonFilter()}</div>
            <div>{this.renderAllProducts()}</div>
          </div>
          <SocialMediaIcons />
        </div>
      </div>
    )
  }
}

export default BookShelves
