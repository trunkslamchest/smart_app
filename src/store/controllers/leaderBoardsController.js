import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import LeaderBoardsContainer from '../../leaderboards/leaderBoardsContainer'

class LeaderBoardsController extends React.Component {

  componentDidMount(){

  }

  componentDidUpdate(){
    if(this.props.auth.status === 'authValid' && !this.props.auth.loading) {
      if(!this.props.leaderBoards.status && !this.props.leaderBoards.overall) this.initLeaderBoardModule()
      if(this.props.leaderBoards.status === 'initLeaderBoards' && !this.props.leaderBoards.overall) this.getOverallLeaderBoardsModule()
      if(this.props.leaderBoards.status === 'fetchOverallLeaderBoards' && this.props.leaderBoards.overall) this.props.onUpdateLeaderBoardsStatus('fetchOverallLeaderBoardsSuccess')

      if(this.props.leaderBoards.status === 'fetchOverallLeaderBoardsSuccess' && !this.props.leaderBoards.cat) this.getCatLeaderBoardsModule()
      if(this.props.leaderBoards.status === 'fetchCatLeaderBoards' && this.props.leaderBoards.cat) this.props.onUpdateLeaderBoardsStatus('fetchCatLeaderBoardsSuccess')

      if(this.props.leaderBoards.status === 'fetchCatLeaderBoardsSuccess' && this.props.leaderBoards.overall && this.props.leaderBoards.cat) this.displayLeaderBoardsModule()

    }


  }

  componentWillUnmount(){
    if(this.props.leaderBoards.overall && this.props.leaderBoards.cat) this.props.onClearLeaderBoards()
  }

  initLeaderBoardModule = () => {
    this.props.onUpdateLeaderBoardsStatus('initLeaderBoards')
  }

  getOverallLeaderBoardsModule = () => {
    this.props.onUpdateLeaderBoardsStatus('fetchOverallLeaderBoards')
    this.props.onGetOverallLeaderBoards()
  }

  getCatLeaderBoardsModule = () => {
    this.props.onUpdateLeaderBoardsStatus('fetchCatLeaderBoards')
    this.props.onGetCatLeaderBoards()
  }

  displayLeaderBoardsModule = () => {
    this.props.onUpdateLeaderBoardsStatus('displayLeaderBoards')
  }

  render(){
    return(
      <LeaderBoardsContainer
        history={ this.props.history }
      />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    auth: state.auth,
    leaderBoards: state.leaderBoards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetOverallLeaderBoards: () => dispatch(actions.getOverallLeaderBoards()),
    onGetCatLeaderBoards: () => dispatch(actions.getCatLeaderBoards()),
    onClearLeaderBoards: () => dispatch(actions.clearLeaderBoards()),
    onUpdateLeaderBoardsStatus: (status) => dispatch(actions.updateLeaderBoardsStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardsController)