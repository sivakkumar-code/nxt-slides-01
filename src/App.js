import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import './App.css'

// This is the list used in the application. You can move them to any component needed.
const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class App extends Component {
  state = {
    slides: initialSlidesList,
    currentSlide: initialSlidesList[0],
    headingBtn: false,
    descriptionBtn: false,
  }

  slideSelected = id =>
    this.setState(prevState => ({
      currentSlide: prevState.slides.find(item => item.id === id),
    }))

  onHeadingChange = e =>
    this.setState(prevState => ({
      currentSlide: {...prevState.currentSlide, heading: e.target.value},
      slides: prevState.slides.map(item => {
        if (item.id === prevState.currentSlide.id) {
          return {...item, heading: e.target.value}
        }
        return item
      }),
    }))

  onDescriptionChange = e =>
    this.setState(prevState => ({
      currentSlide: {...prevState.currentSlide, description: e.target.value},
      slides: prevState.slides.map(item => {
        if (item.id === prevState.currentSlide.id) {
          return {...item, description: e.target.value}
        }
        return item
      }),
    }))

  onHeadingBlur = e => {
    if (e.target.value.length === 0) {
      this.setState(prevState => ({
        slides: prevState.slides.map(item => {
          if (item.id === prevState.currentSlide.id) {
            return {...item, heading: 'Heading'}
          }
          return item
        }),
        currentSlide: {
          ...prevState.currentSlide,
          heading: 'Heading',
        },
        headingBtn: false,
      }))
    } else {
      this.setState({headingBtn: false})
    }
  }

  onDescriptionBlur = e => {
    if (e.target.value.length === 0) {
      this.setState(prevState => ({
        currentSlide: {
          ...prevState.currentSlide,
          description: 'Description',
        },
        slides: prevState.slides.map(item => {
          if (item.id === prevState.currentSlide.id) {
            return {...item, description: 'Description'}
          }
          return item
        }),
        descriptionBtn: false,
      }))
    } else {
      this.setState({descriptionBtn: false})
    }
  }

  onHeadingTextClick = () => this.setState({headingBtn: true})

  onDescriptionTextClick = () => this.setState({descriptionBtn: true})

  addNewSlide = () => {
    const {currentSlide, slides} = this.state
    const {id} = currentSlide
    // const a = [1, 2, 3, 5, 6]
    // a.splice(3, 0, 4)
    // console.log(a)
    const index = slides.indexOf(slides.find(item => item.id === id))
    // const index = slides.indexOf(currentSlide)
    // console.log(index, currentSlide, slides)
    const newSlide = {
      id: uuidV4(),
      heading: 'Heading',
      description: 'Description',
    }
    // console.log(newSlide)
    this.setState(prevState => {
      const slidesList = prevState.slides
      slidesList.splice(index + 1, 0, newSlide)

      return {
        slides: [...slidesList],
        currentSlide: {...newSlide},
        headingBtn: false,
        descriptionBtn: false,
      }
    })
  }

  render() {
    const {slides, currentSlide, descriptionBtn, headingBtn} = this.state
    console.log(slides, currentSlide)
    const {heading, description, id} = currentSlide

    return (
      <div className="bg-container">
        <div className="main-container">
          <header>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
              alt="nxt slides logo"
              className="website-logo"
            />
            <h1>Nxt Slides</h1>
          </header>
          <div className="plus-icon-container">
            <button
              type="button"
              className="new-slides-btn"
              onClick={this.addNewSlide}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
                alt="new plus icon"
                className="plus-icon"
              />
              New
            </button>
          </div>
          <main>
            <ol className="left-container">
              {slides.map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => this.slideSelected(item.id)}
                  testid={`slideTab${index + 1}`}
                  className={`list-container ${
                    id === item.id ? 'selected' : ''
                  }`}
                >
                  <p className="slide-num">{index + 1}</p>
                  <div className="small-slide">
                    <h1 className="heading-text">{item.heading}</h1>
                    <p className="description-text">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="right-container">
              <div className="main-slide-container">
                <div className="heading-container">
                  {!headingBtn && (
                    <h1 className="heading" onClick={this.onHeadingTextClick}>
                      {heading}
                    </h1>
                  )}
                  {headingBtn && (
                    <input
                      type="text"
                      onChange={this.onHeadingChange}
                      value={heading}
                      onBlur={this.onHeadingBlur}
                      className="heading"
                    />
                  )}
                </div>
                <div className="description-container">
                  {!descriptionBtn && (
                    <p
                      className="description"
                      onClick={this.onDescriptionTextClick}
                    >
                      {description}
                    </p>
                  )}
                  {descriptionBtn && (
                    <input
                      type="text"
                      onChange={this.onDescriptionChange}
                      onBlur={this.onDescriptionBlur}
                      value={description}
                      className="description"
                    />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default App
