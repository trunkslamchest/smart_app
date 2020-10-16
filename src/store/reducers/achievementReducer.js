import * as actionTypes from '../actions/actionTypes'

const initialState = {
  all: null,
  totals: null
}

const storeAchievements = (currentState, action) => {
  return {
    ...currentState,
    all: action.all,
    totals: action.totals
  }
}

const clearAchievements = (currentState, action) => {
  return {
    ...currentState,
    all: action.all,
    totals: action.totals
  }
}

const updateAchievements = (currentState, action) => {
  let achievementsObj = {}

  for(let achievement in action.res){
    if(achievement !== 'totals'){
      achievementsObj[achievement] = {
        ...currentState.all[achievement],
        total: action.res[achievement].total
      }
    }
  }

  return {
    ...currentState,
    all: achievementsObj,
    totals: {
      ...currentState.totals,
      all_unlocked: action.res.totals.all_unlocked
    }
  }
}

const achievementReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_ACHIEVEMENTS: return storeAchievements(currentState, action);
    case actionTypes.CLEAR_ACHIEVEMENTS: return clearAchievements(currentState, action);
    case actionTypes.UPDATE_ACHIEVEMENTS: return updateAchievements(currentState, action);

    default: return currentState;
  }
}

export default achievementReducer