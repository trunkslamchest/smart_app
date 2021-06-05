import React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useOnMount from '../../utility/hooks/useOnMount'
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

const LeaderBoardsController = (props) => {

  const [overallLeaderBoards, setOverallLeaderBoards] = useState(false)
  const [catLeaderBoards, setCatLeaderBoards] = useState(false)
  const [displayLeaderBoards, setDisplayLeaderBoards] = useState(false)

  const {
    authStatus,
    leaderBoardCategories,
    leaderBoardLoading,
    leaderBoardOverall,
    leaderBoardStatus,
    onLoadingModal,
    onClearLeaderBoards,
    onGetCatLeaderBoards,
    onGetOverallLeaderBoards,
    onSetLoadingModalType,
    onUpdateLeaderBoardsLoadingStatus,
    onUpdateLeaderBoardsStatus
  } = props

  let propsRef = useRef()

  propsRef.current = {
    leaderBoardCategories: leaderBoardCategories,
    leaderBoardOverall: leaderBoardOverall,
    leaderBoardLoading: leaderBoardLoading,
    leaderBoardStatus: leaderBoardStatus,
  }

  const initLeaderBoardsModule = useCallback(() => {
    onSetLoadingModalType('leaderBoards', 'leaderBoards')
    onLoadingModal(true)
    onUpdateLeaderBoardsLoadingStatus(true)
    onUpdateLeaderBoardsStatus('initLeaderBoards')
  }, [
    onLoadingModal,
    onSetLoadingModalType,
    onUpdateLeaderBoardsLoadingStatus,
    onUpdateLeaderBoardsStatus
  ])

  const getOverallLeaderBoardsModule = useCallback(() => {
    onUpdateLeaderBoardsStatus('getOverallLeaderBoards')
    setOverallLeaderBoards(true)
    onGetOverallLeaderBoards()
  }, [ onGetOverallLeaderBoards, onUpdateLeaderBoardsStatus])

  const getCatLeaderBoardsModule = useCallback(() => {
    onUpdateLeaderBoardsStatus('getCatLeaderBoards')
    setCatLeaderBoards(true)
    onGetCatLeaderBoards()
  }, [
    onGetCatLeaderBoards,
    onUpdateLeaderBoardsStatus
  ])

  const displayLeaderBoardsModule = useCallback(() => {
    onUpdateLeaderBoardsStatus('displayLeaderBoards')
    setDisplayLeaderBoards(true)
    onUpdateLeaderBoardsLoadingStatus(false)
  }, [
    onUpdateLeaderBoardsStatus,
    onUpdateLeaderBoardsLoadingStatus
  ])

  const leaderBoardsCleanupModule = useCallback(() => {
    setOverallLeaderBoards(false)
    setCatLeaderBoards(false)
    setTimeout(() => { onLoadingModal(false) }, 250)
  }, [
    onLoadingModal
  ])

  useOnMount(() => {
    if(!leaderBoardStatus && !leaderBoardOverall && !localStorage.id) initLeaderBoardsModule()
    return () => reset()
  }, [
    leaderBoardOverall,
    leaderBoardStatus
  ])

  const reset = () => {
    setOverallLeaderBoards(false)
    setCatLeaderBoards(false)
    setDisplayLeaderBoards(false)
    if(propsRef.current.leaderBoardOverall && propsRef.current.leaderBoardCategories) onClearLeaderBoards()
    if(propsRef.current.leaderBoardStatus) onUpdateLeaderBoardsStatus(null)
    if(propsRef.current.leaderBoardLoading) onUpdateLeaderBoardsLoadingStatus(false)
  }

  useEffect(() => {
    if(!leaderBoardStatus && !leaderBoardOverall && authStatus === 'authValid') initLeaderBoardsModule()
    if(leaderBoardStatus === 'initLeaderBoards' && !overallLeaderBoards) getOverallLeaderBoardsModule()
    if(leaderBoardStatus === 'getOverallLeaderBoards' && leaderBoardOverall && !catLeaderBoards) getCatLeaderBoardsModule()
    if(leaderBoardStatus === 'getCatLeaderBoards' && leaderBoardOverall && leaderBoardCategories && !displayLeaderBoards) displayLeaderBoardsModule()
    if(leaderBoardOverall && leaderBoardCategories && !leaderBoardLoading) leaderBoardsCleanupModule()
  }, [
    authStatus,
    catLeaderBoards,
    displayLeaderBoards,
    leaderBoardCategories,
    leaderBoardLoading,
    leaderBoardOverall,
    leaderBoardStatus,
    overallLeaderBoards,
    displayLeaderBoardsModule,
    getOverallLeaderBoardsModule,
    getCatLeaderBoardsModule,
    initLeaderBoardsModule,
    leaderBoardsCleanupModule
  ])

  return(
    !props.modalLoading &&
    props.leaderBoardStatus === 'displayLeaderBoards' &&
      <LeaderBoardsContainer
        catRoute={ routes.leader_boards + '/categories' }
        countriesRoute={ routes.leader_boards + '/countries' }
        overallRoute={ routes.leader_boards + '/overall' }
      />
  )
}

const store = (store) => {
  return {
    authStatus: store.auth.status,
    leaderBoardCategories: store.leaderBoards.cat,
    leaderBoardLoading: store.leaderBoards.loading,
    leaderBoardOverall: store.leaderBoards.overall,
    leaderBoardStatus: store.leaderBoards.status,
    modalLoading: store.modal.loading && store.modal.showModal
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