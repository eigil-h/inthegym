import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import {
  StyleSheet, Animated, View, Text
} from 'react-native';
import { usePrevious } from '../common/fun';

const ANIM_T = 500;

const ProgressView = ({ title }) => {
  const styles = createStyles();
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const prevTitle = usePrevious(title);
  const [displayTitle, setDisplayTitle] = useState(prevTitle);
  const [containerHeight, setContainerHeight] = useState();

  const layoutHandler = ({ nativeEvent: { layout: { height } } }) => setContainerHeight(height);

  const scroll = useCallback(() => {
    if (!containerHeight) return;

    const resetTiming = Animated.timing(scrollAnim, {
      toValue: -containerHeight,
      duration: 0,
      useNativeDriver: true
    });
    const inTiming = Animated.timing(scrollAnim, {
      toValue: 0,
      duration: ANIM_T,
      useNativeDriver: true
    });
    const outTiming = Animated.timing(scrollAnim, {
      toValue: containerHeight,
      duration: ANIM_T,
      useNativeDriver: true
    });

    if (prevTitle !== title) {
      setTimeout(() => setDisplayTitle(title), ANIM_T);
      Animated.sequence([outTiming, resetTiming, inTiming]).start();
    } else {
      scrollAnim.setValue(-containerHeight);
      setDisplayTitle(title);
      inTiming.start();
    }
  }, [containerHeight, prevTitle, scrollAnim, title]);

  useEffect(scroll, [scroll]);

  return (
    <View
      style={styles.container}
      onLayout={layoutHandler}
    >
      <Animated.View
        style={[styles.content, { transform: [{ translateY: scrollAnim }] }]}
      >
        <Text style={styles.title}>{displayTitle}</Text>
      </Animated.View>
    </View>
  );
};

/*
 * STYLE
 */
const createStyles = () => {
  const styles = {
    container: {
      flex: 1,
      margin: 6,
      borderWidth: 1,
      borderRadius: 6,
      overflow: 'hidden'
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      margin: 4,
      borderWidth: 1,
      borderRadius: 6
    },
    title: {
      fontFamily: 'sans-serif',
      fontSize: 20,
      textAlign: 'center'
    }
  };

  return StyleSheet.create(styles);
};

export default React.memo(ProgressView);
