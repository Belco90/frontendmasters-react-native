import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ColorsPalette, RootStackParamList } from '../models';
import ColorPalettePreview from '../components/ColorPalettePreview';

const readColorsPalettes: () => Promise<ColorsPalette[]> = async () => {
  const resp = await fetch(
    'https://color-palette-api.kadikraman.now.sh/palettes'
  );

  return await resp.json();
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [colorsPalettes, setColorsPalettes] = React.useState<
    ColorsPalette[] | null
  >(null);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);

  React.useEffect(function fetchColorsPalettes() {
    const getNewColorsPalettes = async () => {
      setIsFetching(true);
      const newColorsPalettes = await readColorsPalettes();
      setColorsPalettes(newColorsPalettes);
      setIsFetching(false);
    };

    getNewColorsPalettes();
  }, []);

  if (isFetching) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!colorsPalettes) {
    return (
      <View style={styles.container}>
        <Text>No colors palettes found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={colorsPalettes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: palette }) => (
        <ColorPalettePreview
          name={palette.paletteName}
          colors={palette.colors.slice(0, 5)}
          onPress={() =>
            navigation.navigate('colorPalette', {
              name: palette.paletteName,
              colors: palette.colors,
            })
          }
        />
      )}
      style={styles.container}
      ItemSeparatorComponent={() => (
        <View style={styles.colorPaletteSeparator} />
      )}
    />
  );
};

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
