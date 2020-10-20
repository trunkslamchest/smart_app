import React from 'react'
import { connect} from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardAnswersCatCard from '../dashboardAnswersCatCard/dashboardAnswersCatCard'

import './dashboardAnswersDiffCard.css'

class DashboardAnswersDiffCard extends React.Component {

  state = { showCats: false }

  constructor(props) {
    super(props)
    this.setDiffRef = this.setDiffRef.bind(this)
    this.setCatRef = this.setCatRef.bind(this)
  }

  componentDidMount() { document.addEventListener('click', this.onClickListen) }
  componentWillUnmount() { document.removeEventListener('click', this.onClickListen) }

  setDiffRef(node){this.diffRef = node}
  setCatRef(node){this.catRef = node}

  onClickListen = (event) => { if(!this.diffRef.contains(event.target) && !this.catRef.contains(event.target)) this.setState({ showCats: false }) }

  onDropDown = () => {
    let switchCats = !this.state.showCats
    this.setState({ showCats: switchCats })
  }

  render(){

    let distribCats

    if(this.state.showCats){
      let cats = Object.entries(this.props.diff[1].categories)
      distribCats = cats.map(cat => {
        return (
          <DashboardAnswersCatCard
            key={ cats.indexOf(cat) }
            cat={ cat }
          />
        )
      })
    }

    return(
      <div className='dashboard_answers_diff_card_container'>
      <button
        ref={ this.setDiffRef }
        onClick={ this.onDropDown }
      >
        { this.props.diff[0] }
      </button>
        <div className='dashboard_answers_cat_card_container'
          ref={ this.setCatRef }
        >
          { distribCats }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnswersDiffCard)