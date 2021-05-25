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
    if(!this.props.leaderBoardStatus && !this.props.leaderBoardOverall) this.initLeaderBoardsModule()
  }

  componentDidUpdate(){
    if(this.props.leaderBoardStatus === 'initLeaderBoards' && !this.props.leaderBoardOverall) this.getOverallLeaderBoardsModule()
    if(this.props.leaderBoardOverall && !this.state.storeCatLeaderBoards) this.getCatLeaderBoardsModule()
    if(this.props.leaderBoardOverall && this.props.leaderBoardCategories && !this.state.displayLeaderBoards) this.displayLeaderBoardsModule()
    if(this.props.leaderBoardOverall && this.props.leaderBoardCategories && !this.props.leaderBoardLoading) this.leaderBoardsCleanupModule()
  }

  shouldComponentUpdate(nextProps, nextState){
    let render = false
    if(this.props.modalLoading || nextProps.modalLoading) render = true
    return render
  }

  componentWillUnmount(){
    if(this.props.leaderBoardOverall && this.props.leaderBoardCategories) this.props.onClearLeaderBoards()
    if(this.props.leaderBoardStatus)this.props.onUpdateLeaderBoardsStatus(null)
    if(this.props.leaderBoardLoading)this.props.onUpdateLeaderBoardsLoadingStatus(false)
    clearTimeout(this.authWaitTimeoutQuarterSec)
    clearTimeout(this.authWaitTimeoutHalfSec)
    clearTimeout(this.authWaitTimeoutOneSec)
  }

  initLeaderBoardsModule = () => {
    this.props.onLoadingModal(true)
    this.props.onSetLoadingModalType('leaderBoards', 'leaderBoards')
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
          this.props.leaderBoardStatus === 'displayLeaderBoards' &&
          !this.props.leaderBoardLoading &&
          !this.props.modalLoading &&
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
    modalLoading: store.modal.loading,
    leaderBoardStatus: store.leaderBoards.status,
    leaderBoardLoading: store.leaderBoards.loading,
    leaderBoardOverall: store.leaderBoards.overall,
    leaderBoardCategories: store.leaderBoards.cat

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