const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  var good, ok, bad, newState
  switch (action.type) {
    case 'GOOD':
      good = state.good
      ok = state.ok
      bad = state.bad
      newState = {
          good : good+1,
          ok: ok,
          bad: bad
      }
      return newState
    case 'OK':
      good = state.good
      ok = state.ok
      bad = state.bad
      newState = {
          good : good,
          ok: ok + 1,
          bad: bad
      }
      return newState
    case 'BAD':
      good = state.good
      ok = state.ok
      bad = state.bad
      newState = {
          good : good,
          ok: ok,
          bad: bad + 1
      }
      return newState
    case 'ZERO':
      newState = {
          good : 0,
          ok: 0,
          bad: 0
      }
      return newState
    default: return state
  }
}

export default counterReducer