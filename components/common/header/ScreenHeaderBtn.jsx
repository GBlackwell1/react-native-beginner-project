import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity, Image } from 'react-native'
import styles from './screenheader.style'

const ScreenHeaderBtn = (props) => {
  // Just think of onPress as the same thing for onClick
  // TouchableOpacity is the same thing as the react button
  // component, it's just transparent so there's a little touchable
  // area for you to interact with
  
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={props.handlePress}>
      <Image
        source={props.iconUrl}
        resizeMode='cover'
        style={styles.btnImg(props.dimension)}
      >

      </Image>
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn