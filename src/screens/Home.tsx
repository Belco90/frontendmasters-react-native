import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Button,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ColorsPalette,
  RootStackParamList,
  MainStackParamList,
} from '../models';
import ColorPalettePreview from '../components/ColorPalettePreview';

const readColorsPalettes: () => Promise<ColorsPalette[]> = async () => {
  const resp = await fetch(
    'https://color-palette-api.kadikraman.now.sh/palettes'
  );

  return await resp.json();
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList & MainStackParamList,
  'home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [colorsPalettes, setColorsPalettes] = React.useState<
    ColorsPalette[] | null
  >(null);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleRefreshColorsPalettes = async () => {
    setIsFetching(true);
    const newColorsPalettes = await readColorsPalettes();
    setColorsPalettes(newColorsPalettes);
    setIsFetching(false);
  };

  // React.useEffect(function fetchColorsPalettes() {
  //   handleRefreshColorsPalettes();
  // }, []);

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
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={handleRefreshColorsPalettes}
        />
      }
      ListHeaderComponent={() => (
        <View style={styles.launchModalButtonWrapper}>
          <Button
            title="➕ Add colors scheme"
            onPress={() => navigation.navigate('newColorPalette')}
          />
        </View>
      )}
      ListEmptyComponent={() => (
        <View>
          <Text>Pull to refresh</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  colorPaletteSeparator: {
    marginVertical: 15,
  },
  launchModalButtonWrapper: {
    marginBottom: 15,
  },
  launchModalButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
