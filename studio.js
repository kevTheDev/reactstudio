import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Box,
  VrButton
} from 'react-vr';
import {connect} from 'react-redux'

import Hud from './hud.js'
import DimensionHud from './dimension_hud.js'
import StudioActions from './redux/StudioRedux'
import RotationHud from './rotation_hud.js'

class Studio extends React.Component {
  constructor(props) {
      super(props);
      // Toggle the state every second
      this.state = {}
      setInterval(() => {
        this.setState({ showText: !this.state.showText });
      }, 1000);
    }

  render() {
    //console.log('props: ', this.props)

    const {transformBox, x, y, z, width, height, depth, rotationX, rotationY, rotationZ, addBox} = this.props

    return (
      <View>
        <Hud xPlusClicked={() => transformBox({x: x + 1})}
             xMinusClicked={() => transformBox({x: x - 1})}
             yPlusClicked={() => transformBox({y: y + 1})}
             yMinusClicked={() => transformBox({y: y - 1})}
             zPlusClicked={() => transformBox({z: z + 1})}
             zMinusClicked={() => transformBox({z: z - 1})}
             addBox={() => addBox()}>
        </Hud>

        <DimensionHud widthPlusClicked={() => transformBox({width: width + 1})}
            widthMinusClicked={() => transformBox({width: width - 1})}
            heightPlusClicked={() => transformBox({height: height + 1})}
            heightMinusClicked={() => transformBox({height: height - 1})}
            depthPlusClicked={() => transformBox({depth: depth + 1})}
            depthMinusClicked={() => transformBox({depth: depth - 1})}>
        </DimensionHud>

        <RotationHud xPlusClicked={() => transformBox({rotationX: rotationX + 5})}
             xMinusClicked={() => transformBox({rotationX: rotationX - 5})}
             yPlusClicked={() => transformBox({rotationY: rotationY + 5})}
             yMinusClicked={() => transformBox({rotationY: rotationY - 5})}
             zPlusClicked={() => transformBox({rotationZ: rotationZ + 5})}
             zMinusClicked={() => transformBox({rotationZ: rotationZ - 5})}>
        </RotationHud>

        <Box
          dimWidth={width}
          dimDepth={depth}
          dimHeight={height}
          wireframe={false}
          style={{
            layoutOrigin: [0, 0],
            transform: [
              {translate: [x, y, z]},
              {rotateX : rotationX},
              {rotateY : rotationY},
              {rotateZ : rotationZ},
            ]
          }}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  x: state.studio.boxes.slice(-1)[0].x,
  y: state.studio.boxes.slice(-1)[0].y,
  z: state.studio.boxes.slice(-1)[0].z,
  width: state.studio.boxes.slice(-1)[0].width,
  depth: state.studio.boxes.slice(-1)[0].depth,
  height: state.studio.boxes.slice(-1)[0].height,
  rotationX: state.studio.boxes.slice(-1)[0].rotationX,
  rotationY: state.studio.boxes.slice(-1)[0].rotationY,
  rotationZ: state.studio.boxes.slice(-1)[0].rotationZ
})

const mapDispatchToProps = dispatch => {
  return {
    transformBox: (attr) => dispatch(StudioActions.transformBox(attr)),
    addBox: () => dispatch(StudioActions.addBox())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Studio)
