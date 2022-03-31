import React, { useCallback, useEffect, useRef } from 'react';
import {
  FlatList, StyleSheet, Text, View
} from 'react-native';
import ProgressItem, { PROGRESS_STATE } from './ProgressItem';

export const PROGRESS_TYPE = {
  EXERCISE: 'Exercises',
  STEP: 'Steps'
};

const ProgressList = ({
  progressType,
  elements,
  activeIndex
}) => {
  const ref = useRef(null);
  const progressStateForIndex = useCallback((index, currentIndex) =>
  // eslint-disable-next-line no-nested-ternary,implicit-arrow-linebreak
    (index === currentIndex
      ? PROGRESS_STATE.PRESENT : index < currentIndex
        ? PROGRESS_STATE.PAST : PROGRESS_STATE.FUTURE),
  []);

  useEffect(() => ref.current.scrollToIndex({ index: activeIndex, viewPosition: 1 }),
    [ref, activeIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{progressType}</Text>
      </View>
      <FlatList
        data={elements}
        extraData={activeIndex}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => (
          <ProgressItem
            title={item.title}
            progressState={progressStateForIndex(index, activeIndex)}
            scrollRef={ref}
          />
        )}
        ref={ref}
      />
    </View>
  );
};

/*
 * STYLE
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    paddingVertical: 5,
    alignItems: 'center'
  }
});

export default ProgressList;
