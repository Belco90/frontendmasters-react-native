import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Swatch from '../components/Swatch';
import { RootStackParamList } from '../models';
import { RouteProp } from '@react-navigation/native';

type ColorPaletteScreenRouteProp = RouteProp<
  RootStackParamList,
  'colorPalette'
>;

type Props = {
  route: ColorPaletteScreenRouteProp;
};

const ColorPalette: React.FC<Props> = ({ route }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={route.params.colors}
        renderItem={({ item }) => (
          <Swatch hexCode={item.hexCode}>{item.colorName}</Swatch>
        )}
        keyExtractor={({ colorName }) => colorName}
        style={styles.listWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listWrapper: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ColorPalette;
