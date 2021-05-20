import React from 'react'
import { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { loading } from './store/actions/actionIndex'
import { Route, Switch } from 'react-router-dom'
import { routes } from './utility/paths'

import AuthController from './store/controllers/authController'

import LeaderBoardsController from './store/controllers/leaderBoardsController'
import ProfileController from './store/controllers/profileController'
import PlayController from './store/controllers/playController'
import QuestionsController from './store/controllers/questionsController'

import Header from './UI/header/header'
import Footer from './UI/footer/footer'

import BasicModal from './UI/modal/basicModal/basicModal'
import LogIn from './UI/modal/logIn/logIn'
import SignUp from './UI/modal/signUp/signUp'
import LogOut from './UI/modal/logOut/logOut'
import DeleteProfile from './UI/modal/deleteProfile/deleteProfile'
import EditProfile from './UI/modal/editProfile/editProfile'

import Help from './UI/modal/help/help'
import LoadingModal from './UI/loading/loadingModal/loadingModal'

import HomeContainer from './home/HomeContainer'
import DashboardContainer from './user/dashboard/dashboardContainer'

import TermsOfService from './docs/termsOfService/termsOfService'
import PrivacyPolicy from './docs/privacyPolicy/privacyPolicy'
import Disclaimer from './docs/disclaimer/disclaimer'
import License from './docs/license/license'

import E404 from './error/E404'

import './App.css'

const App = (props) => {

  const [loadingModalType, setLoadingModalType] = useState('auth');
  const [loadingModalBarType, setLoadingModalBarType] = useState(props.auth.authType);
  const [basicModalContent, setBasicModalContent] = useState(null);

  const switchLoadingModalType = useCallback((modalType) => { setLoadingModalType(modalType) }, [])
  const switchLoadingModalBarType = useCallback((barType) => { setLoadingModalBarType(barType)}, [])
  const switchbasicModalContent = useCallback((content) => { setBasicModalContent(content)}, [])

  return (
    <>
      <AuthController />
      { props.modal.basic && <BasicModal
        content={ basicModalContent }
        switchbasicModalContent={ switchbasicModalContent }
      /> }
      { props.modal.login && <LogIn /> }
      { props.modal.logout && <LogOut /> }
      { props.modal.signup && <SignUp /> }
      { props.modal.editProfile && <EditProfile /> }
      { props.modal.deleteProfile && <DeleteProfile /> }
      { props.modal.help && <Help
        headerText={ props.modal.helpHeader }
        helpSections = { props.modal.helpSections }
      /> }
      <Header />
      <div className='main_container' name="main_container">
        {
          props.modal.loading &&
          <LoadingModal
            show={ props.modal.loading }
            modalType={ loadingModalType }
            barType={ loadingModalBarType }
          />
        }
        <div className='main_wrapper' name="main_wrapper">
          <Switch>
            <Route exact path={ routes.home }>
              <HomeContainer
                authStatus={ props.auth.status }
                authLoading={ props.auth.loading }
                modalLoading={ props.modal.loading }
                userName={ props.user.info ? props.user.info.user_name : null }
              />
            </Route>
            <Route path={ routes.dashboard }>
              <DashboardContainer
                switchbasicModalContent={ switchbasicModalContent }
              />
            </Route>
            <Route path={ routes.user_profile }>
              <ProfileController
                switchLoadingModalType={ switchLoadingModalType }
                switchLoadingModalBarType={ switchLoadingModalBarType }
              />
            </Route>
            <Route path={ routes.static_results }>
              <QuestionsController
                switchLoadingModalType={ switchLoadingModalType }
                switchLoadingModalBarType={ switchLoadingModalBarType }
              />
            </Route>
            <Route path={ routes.play }>
              <PlayController />
            </Route>
            <Route path={ routes.leader_boards }>
              <LeaderBoardsController
                switchLoadingModalType={ switchLoadingModalType }
                switchLoadingModalBarType={ switchLoadingModalBarType }
              />
            </Route>
            <Route exact path={ routes.tos }><TermsOfService /></Route>
            <Route exact path={ routes.privacy }><PrivacyPolicy /></Route>
            <Route exact path={ routes.disclaimer }><Disclaimer /></Route>
            <Route exact path={ routes.license }><License /></Route>
            <Route><E404 /></Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  )
}

const store = store => {
  return {
    auth: store.auth,
    modal: store.modal,
    user: store.user
  }
}

const dispatch = dispatch => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool))
  }
}

export default connect(store, dispatch)(App)