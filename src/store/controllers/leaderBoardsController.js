import React from 'react'
import { connect } from 'react-redux'
import { routes } from '../../utility/paths'
import {
  loading,
  setLoadingModalType,
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
    if(!this.props.leaderBoards.status && !this.props.leaderBoards.overall) this.initLeaderBoardsModule()
  }

  componentDidUpdate(){
    if(this.props.leaderBoards.status === 'initLeaderBoards' && !this.props.leaderBoards.overall) this.getOverallLeaderBoardsModule()
    if(this.props.leaderBoards.overall && !this.state.storeCatLeaderBoards) this.getCatLeaderBoardsModule()
    if(this.props.leaderBoards.overall && this.props.leaderBoards.cat && !this.state.displayLeaderBoards) this.displayLeaderBoardsModule()
    if(this.props.leaderBoards.overall && this.props.leaderBoards.cat && !this.props.leaderBoards.loading) this.leaderBoardsCleanupModule()
  }

  shouldComponentUpdate(nextProps, nextState){
    let render = false
    if(this.props.modal.loading || nextProps.modal.loading) render = true
    return render
  }

  componentWillUnmount(){
    if(this.props.leaderBoards.overall && this.props.leaderBoards.cat) this.props.onClearLeaderBoards()
    if(this.props.leaderBoards.status)this.props.onUpdateLeaderBoardsStatus(null)
    if(this.props.leaderBoards.loading)this.props.onUpdateLeaderBoardsLoadingStatus(false)
    clearTimeout(this.authWaitTimeoutQuarterSec)
    clearTimeout(this.authWaitTimeoutHalfSec)
    clearTimeout(this.authWaitTimeoutOneSec)
  }

  initLeaderBoardsModule = () => {
    this.props.onLoadingModal(true)
    this.props.onSetLoadingModalType('leaderBoards', 'leaderBoards')

    // this.props.switchLoadingModalType('leaderBoards')
    // this.props.switchLoadingModalBarType('leaderBoards')
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
    this.props.onLoadingModal(false)
  }

  leaderBoardsCleanupModule = () => {
    this.setState({ storeOverallLeaderBoards: false, storeCatLeaderBoards: false })
  }

  render(){
    return(
      <>
        {
          this.props.leaderBoards.status === 'displayLeaderBoards' &&
          !this.props.leaderBoards.loading &&
          !this.props.modal.loading &&
            <LeaderBoardsContainer
              overallRoute={ routes.leader_boards + '/overall' }
              countriesRoute={ routes.leader_boards + '/countries' }
              catRoute={ routes.leader_boards + '/categories' }
            />
        }
      </>
    )
  }

}

const store = (store) => {
  return {
    modal: store.modal,
    leaderBoards: store.leaderBoards
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onSetLoadingModalType: (modalType, barType) => dispatch(setLoadingModalType(modalType, barType)),
    onGetOverallLeaderBoards: () => dispatch(getOverallLeaderBoards()),
    onGetCatLeaderBoards: () => dispatch(getCatLeaderBoards()),
    onClearLeaderBoards: () => dispatch(clearLeaderBoards()),
    onUpdateLeaderBoardsStatus: (status) => dispatch(updateLeaderBoardsStatus(status)),
    onUpdateLeaderBoardsLoadingStatus: (status) => dispatch(updateLeaderBoardsLoadingStatus(status))
  }
}

export default connect(store, dispatch)(LeaderBoardsController)