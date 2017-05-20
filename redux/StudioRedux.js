import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'


const {Types, Creators} = createActions({
  transformBox: ['changedAttribute'],
  addBox: null,
  removeCurrentBox: null
})

export const StudioTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  boxes: [
    {
      x: 1,
      y: 0,
      z: -10,
      width: 1,
      height: 1,
      depth: 1,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0
    }
  ]
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const transformCurrentBox = (state, {changedAttribute}) => {
  const lastIndex = state.boxes.length - 1
  const changedAttributeName = Object.keys(changedAttribute)[0]

  return state.setIn(['boxes', `${lastIndex}`, changedAttributeName], changedAttribute[changedAttributeName])
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSFORM_BOX]: transformCurrentBox
  //[Types.ADD_BOX]: addBox,
  //[Types.REMOVE_CURRENT_BOX]: removeBox,

})
