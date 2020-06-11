import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../models';
import * as COLORS_PALETTES from '../colors-palettes';
import ColorPalettePreview from '../components/ColorPalettePreview';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => (
  <FlatList
    data={Object.values(COLORS_PALETTES)}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item: colors, index }) => (
      <ColorPalettePreview
        name={Object.keys(COLORS_PALETTES)[index].replace('_COLORS', '')}
        colors={colors.slice(0, 5)}
        onPress={() =>
          navigation.navigate('color-palette', {
            name: Object.keys(COLORS_PALETTES)[index].replace('_COLORS', ''),
            colors,
          })
        }
      />
    )}
    style={styles.container}
    ItemSeparatorComponent={() => <View style={styles.colorPaletteSeparator} />}
  />
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
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
  colorPaletteSeparator: {
    marginVertical: 5,
  },
});

export default Home;
