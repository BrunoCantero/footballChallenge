import React from "react";
import { View } from "react-native";
import {styles} from './SkeletonList.styles';

export const SkeletonLoading = () => {
    return (
      <View style={styles.skeletonContainer}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.skeletonItem}>
            <View style={styles.skeletonText} />
            <View style={styles.skeletonText} />
            <View style={styles.skeletonText} />
          </View>
        ))}
      </View>
    );
  };
  
  