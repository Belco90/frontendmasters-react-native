import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Swatch: React.FC<{
  hexCode: string;
}> = ({ children, hexCode }) => {
  const textColor = {
    color:
      parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1
        ? 'black'
        : 'white',
  };

  return (
    <View style={[styles.swatch, { backgroundColor: hexCode }]}>
      <Text style={[styles.swatchText, textColor]}>
        {children} {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  swatch: {
    width: '100%',
    marginVertical: 5,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  swatchText: {
    fontWeight: '700',
  },
});

export default Swatch;
