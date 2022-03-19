import React, { useCallback, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProgressItem, { PROGRESS_STATE } from './ProgressItem';

const ProgressList = ({ elements, activeIndex }) => {
  const ref = useRef(null);

  const progressStateForIndex = useCallback((index, currentIndex) =>
  // eslint-disable-next-line no-nested-ternary,implicit-arrow-linebreak
    (index === currentIndex
      ? PROGRESS_STATE.PRESENT : index < currentIndex
        ? PROGRESS_STATE.PAST : PROGRESS_STATE.FUTURE),
  []);

  return (
    <View style={styles.listContainer}>
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
  listContainer: {
    flex: 1,
    flexDirection: 'column'
  }
});

export default ProgressList;
