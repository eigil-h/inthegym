import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import {
  StyleSheet, Animated, View, Text
} from 'react-native';
import { usePrevious } from '../common/fun';

const ProgressView = ({ title }) => {
  const styles = createStyles();
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const prevTitle = usePrevious(title);
  const [displayTitle, setDisplayTitle] = useState(prevTitle);

  const scroll = useCallback(() => {
    const inTiming = Animated.timing(scrollAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    });
    const outTiming = Animated.timing(scrollAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    });

    if (prevTitle !== null) {
      setTimeout(() => setDisplayTitle(title), 500);
      Animated.sequence([outTiming, inTiming]).start();
    } else {
      setDisplayTitle(title);
      inTiming.start();
    }
  }, [prevTitle, scrollAnim, title]);

  useEffect(scroll, [scroll]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.content, { opacity: scrollAnim }]}
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
      borderRadius: 6
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
