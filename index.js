import React, { useState, useRef } from 'react'
import { func, node } from 'prop-types'
import { Animated, View, ViewPropTyops } from 'react-native'

const AnimatedHeaderScrollView = ({ children, renderHeader, style }) => {
  const scrollY = useRef(new Animated.Value(0)).current

  const [height, setHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [layoutHeight, setLayoutHeight] = useState(0)
  const [top, setTop] = useState(true)

  const lastScroll = contentHeight - layoutHeight

  const maxScrollY = lastScroll > 0 ? lastScroll : 0

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
    listener: ({ nativeEvent: { contentOffset } }) =>
      contentOffset.y > 0 ? setTop(false) : setTop(true),
  })

  const onContentSizeChange = (_, y) => setContentHeight(y)

  const onLayout = ({ nativeEvent: { layout } }) => setLayoutHeight(layout.height)

  const translateY = Animated.diffClamp(
    scrollY.interpolate({
      inputRange: [-1, 0, maxScrollY, maxScrollY + 1],
      outputRange: [0, 0, -maxScrollY, -maxScrollY],
    }),
    -height,
    0,
  )
  
  const scrollProps = {
    onScroll,
    onContentSizeChange,
    onLayout,
  }

  return (<>
    <Animated.ScrollView {...scrollProps} style={style}>
      <View style={{ marginTop: height }}>
        {children}
      </View>
    </Animated.ScrollView>
    <Animated.View
      onLayout={({ nativeEvent }) => setHeight(nativeEvent.layout.height)}
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      {renderHeader(top)}
    </Animated.View>
  </>
  )
}

AnimatedHeaderScrollView.propTypes = {
  children: node,
  style: ViewPropTyops.style,
  renderHeader: func,
}

export default AnimatedHeaderScrollView

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  }
})
