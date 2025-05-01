import {View} from 'react-native';
import React from 'react';
import ParentComponent from '../components/prop_drilling/ParentComponent';

const PropDrilling = () => {
  return (
    <View>
      <ParentComponent />
    </View>
  );
};

export default PropDrilling;
