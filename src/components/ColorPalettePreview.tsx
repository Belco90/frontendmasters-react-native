import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TColor } from '../models';

type Props = {
  name: string;
  colors: Array<TColor>;
  onPress: () => void;
};

const ColorPalettePreview: React.FC<Props> = ({ name, onPress, colors }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.colorPreview}>
        <Text style={styles.colorHeading}>{name}</Text>
        <FlatList
          style={styles.colorsPreviewList}
          data={colors}
          keyExtractor={(item) => item.colorName}
          renderItem={({ item }) => (
            <View
              style={[styles.colorTile, { backgroundColor: item.hexCode }]}
            />
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  colorPreview: {
    padding: 20,
  },
  colorHeading: {
    marginBottom: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  colorsPreviewList: {
    flexDirection: 'row',
  },
  colorTile: {
    height: 40,
    width: 40,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default ColorPalettePreview;
