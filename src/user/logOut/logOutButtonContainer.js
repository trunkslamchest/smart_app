import React from 'react'

import LogOutButton from './logOutButton/logOutButton'

export default class LogOutButtonContainer extends React.Component {

  state={
    hoverConfirm: false,
    hoverCancel: false
  }

  onHoverConfirm = () => {this.setState({ hoverConfirm: true })}
  offHoverConfirm = () => {this.setState({ hoverConfirm: false })}
  onHoverCancel = () => {this.setState({ hoverCancel: true })}
  offHoverCancel = () => {this.setState({ hoverCancel: false })}

  render(){
    return(
      <div className='default_centered_buttons_container'>
        <LogOutButton
          id='log_out_form_confirm'
          name='log_out_form_confirm'
          className='log_out_button'
          onClick={this.props.onConfirm}
        >
          Yes
        </LogOutButton>
        <LogOutButton
          id='log_out_form_cancel'
          name='log_out_form_cancel'
          className='log_out_button'
          onClick={this.props.onCancel}
        >
          No
        </LogOutButton>
      </div>
    )
  }
}