import React from 'react'
import { connect } from 'react-redux'
import { routes } from '../../utility/paths'
import {
  loading,
  getOverallLeaderBoards,
  getCatLeaderBoards,
  clearLeaderBoards,
  updateLeaderBoardsStatus,
  updateLeaderBoardsLoadingStatus
} from '../../store/actions/actionIndex'

import LeaderBoardsContainer from '../../leaderboards/leaderBoardsContainer'

class LeaderBoardsController extends React.Component {

  state = {
    storeOverallLeaderBoards: false,
    storeCatLeaderBoards: false,
    displayLeaderBoards: false,
  }

  componentDidMount(){
    if(!this.props.leaderBoards.status && !this.props.leaderBoards.overall) this.initLeaderBoardModule()
  }

  componentDidUpdate(){
      if(this.props.leaderBoards.status === 'initLeaderBoards' && !this.props.leaderBoards.overall) this.getOverallLeaderBoardsModule()
      if(this.props.leaderBoards.overall && !this.state.storeCatLeaderBoards) this.getCatLeaderBoardsModule()
      if(this.props.leaderBoards.overall && this.props.leaderBoards.cat && !this.state.displayLeaderBoards) this.displayLeaderBoardsModule()
      if(this.props.leaderBoards.overall && this.props.leaderBoards.cat && !this.props.leaderBoards.loading) this.leaderBoardsCleanupModule()
  }

  shouldComponentUpdate(nextProps, nextState){
    let render = false

   if(nextProps.modal.loading) {
      render = true
    }

    // console.log(
    //   this.props.leaderBoards, nextProps.leaderBoards, "|",
    //   this.props.modal.loading, nextProps.modal.loading
    // )

    return render
    // return true
  }

  componentWillUnmount(){
    if(this.props.leaderBoards.overall && this.props.leaderBoards.cat) this.props.onClearLeaderBoards()
    if(this.props.leaderBoards.status)this.props.onUpdateLeaderBoardsStatus(null)
    if(this.props.leaderBoards.loading)this.props.onUpdateLeaderBoardsLoadingStatus(false)
    clearTimeout(this.authWaitTimeoutQuarterSec)
    clearTimeout(this.authWaitTimeoutHalfSec)
    clearTimeout(this.authWaitTimeoutOneSec)
  }

  initLeaderBoardModule = () => {
    this.props.onLoadingModal(true)
    this.props.switchLoadingModalType('leaderBoards')
    this.props.switchLoadingModalBarType('leaderBoards')
    this.props.onUpdateLeaderBoardsLoadingStatus(true)
    this.props.onUpdateLeaderBoardsStatus('initLeaderBoards')
  }

  getOverallLeaderBoardsModule = () => {
    this.props.onUpdateLeaderBoardsStatus('getOverallLeaderBoards')
    this.setState({ storeOverallLeaderBoards: true })
    this.props.onGetOverallLeaderBoards()
  }

  getCatLeaderBoardsModule = () => {
    this.props.onUpdateLeaderBoardsStatus('getCatLeaderBoards')
    this.setState({ storeCatLeaderBoards: true })
    this.props.onGetCatLeaderBoards()
  }

  displayLeaderBoardsModule = () => {
    this.props.onUpdateLeaderBoardsStatus('displayLeaderBoards')
    this.setState({ displayLeaderBoards: true })
    this.props.onUpdateLeaderBoardsLoadingStatus(false)
  }

  leaderBoardsCleanupModule = () => {
    this.setState({ storeOverallLeaderBoards: false, storeCatLeaderBoards: false })
    this.props.onLoadingModal(false)
}

  render(){

    return(
      <LeaderBoardsContainer
        history={ this.props.history }
        overallRoute={ routes.leader_boards + '/overall' }
        countriesRoute={ routes.leader_boards + '/countries' }
        catRoute={ routes.leader_boards + '/categories' }
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
    onGetOverallLeaderBoards: () => dispatch(getOverallLeaderBoards()),
    onGetCatLeaderBoards: () => dispatch(getCatLeaderBoards()),
    onClearLeaderBoards: () => dispatch(clearLeaderBoards()),
    onUpdateLeaderBoardsStatus: (status) => dispatch(updateLeaderBoardsStatus(status)),
    onUpdateLeaderBoardsLoadingStatus: (status) => dispatch(updateLeaderBoardsLoadingStatus(status)),
    onLoadingModal: (bool) => dispatch(loading(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardsController)