// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    isRegistered: false,
    showFirstNameError: false,
    showLastNameError: false,
    firstNameInput: '',
    lastNameInput: '',
  }

  onChangeFirstName = event => {
    this.setState({firstNameInput: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastNameInput: event.target.value})
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()

    this.setState({showFirstNameError: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()

    this.setState({showLastNameError: !isValidLastName})
  }

  validateLastName = () => {
    const {lastNameInput} = this.state

    return lastNameInput !== ''
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state

    return firstNameInput !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isRegistered: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isRegistered: false,
      })
    }
  }

  renderFirstName = () => {
    const {firstNameInput, showFirstNameError} = this.state
    const className = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'
    return (
      <div className="input-container">
        <label htmlFor="firstName" className="input-label">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          value={firstNameInput}
          onBlur={this.onBlurFirstName}
          onChange={this.onChangeFirstName}
          className={className}
        />
      </div>
    )
  }

  renderLastName = () => {
    const {lastNameInput, showLastNameError} = this.state
    const className = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'
    return (
      <div className="input-container">
        <label htmlFor="lastName" className="input-label">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Last name"
          className={className}
          value={lastNameInput}
          onBlur={this.onBlurLastName}
          onChange={this.onChangeLastName}
        />
      </div>
    )
  }

  renderRegistrationForm = () => {
    const {showFirstNameError, showLastNameError} = this.state
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderFirstName()}
        {showFirstNameError && <p className="error-message">Required</p>}
        {this.renderLastName()}
        {showLastNameError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isRegistered: !prevState.isRegistered,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }

  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isRegistered} = this.state

    return (
      <div className="container">
        <h1 className="form-heading">Registration Form</h1>
        <div className="view-container">
          {isRegistered
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
