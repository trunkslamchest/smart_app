import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loading } from './store/actions/actionIndex'
import { Route, Switch } from 'react-router-dom'
import { routes } from './utility/paths'

import StoreController from './store/controllers/storeController'
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

  const switchLoadingModalType = (modalType) => { setLoadingModalType(modalType) }
  const switchLoadingModalBarType = (barType) => { setLoadingModalBarType(barType) }
  const switchbasicModalContent = (content) => { setBasicModalContent(content) }

  return (
    <StoreController history={ props.history }>
      { props.modal.basic && <BasicModal content={ basicModalContent } history={ props.history } switchbasicModalContent={ switchbasicModalContent } /> }
      { props.modal.login && <LogIn history={ props.history } /> }
      { props.modal.logout && <LogOut history={ props.history } /> }
      { props.modal.signup && <SignUp history={ props.history } /> }
      { props.modal.deleteProfile && <DeleteProfile history={ props.history } /> }
      { props.modal.help && <Help headerText={ props.modal.helpHeader } helpSections = { props.modal.helpSections } history={ props.history } /> }
      <Header history={ props.history } />
      <div className='main_container' name="main_container">
        {
          props.modal.loading &&
          <LoadingModal
            show={ props.modal.loading }
            modalType={ loadingModalType }
            barType={ loadingModalBarType }
            history={ props.history }
          />
        }
        <div className='main_wrapper' name="main_wrapper">
          <Switch>
            <Route exact path={ routes.home }>
              <HomeContainer history={ props.history } />
            </Route>
            <Route path={ routes.dashboard }>
              <DashboardContainer
                switchbasicModalContent={ switchbasicModalContent }
                history={ props.history }
              />
            </Route>
            <Route path={ routes.user_profile }>
              <ProfileController
                history={ props.history }
                switchLoadingModalType={ switchLoadingModalType }
                switchLoadingModalBarType={ switchLoadingModalBarType }
              />
            </Route>
            <Route path={ routes.static_results }>
              <QuestionsController
                history={ props.history }
                switchLoadingModalType={ switchLoadingModalType }
                switchLoadingModalBarType={ switchLoadingModalBarType }
              />
            </Route>
            <Route path={ routes.play }>
              <PlayController history={ props.history } />
            </Route>
            <Route path={ routes.leader_boards }>
              <LeaderBoardsController
                history={ props.history }
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
      <Footer history={ props.history } />
    </StoreController>
  )
}

const store = store => {
  return {
    auth: store.auth,
    modal: store.modal
  }
}

const dispatch = dispatch => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool))
  }
}

export default connect(store, dispatch)(App)