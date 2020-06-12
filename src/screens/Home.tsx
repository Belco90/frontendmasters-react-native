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
import { ColorsPalette, AppStackParamList } from '../models';
import ColorPalettePreview from '../components/ColorPalettePreview';
import { RouteProp } from '@react-navigation/native';

const readColorsPalettes: () => Promise<ColorsPalette[]> = async () => {
  const resp = await fetch(
    'https://color-palette-api.kadikraman.now.sh/palettes'
  );

  return await resp.json();
};

type HomeScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<AppStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const Home: React.FC<Props> = ({ navigation, route }) => {
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

  React.useEffect(function fetchColorsPalettes() {
    handleRefreshColorsPalettes();
  }, []);

  React.useEffect(
    function insertNewColorsPalette() {
      const newScheme = route.params?.newColorsPalette;
      if (newScheme) {
        setColorsPalettes((currentPalettes) => {
          const newId = currentPalettes ? currentPalettes.length + 1 : 100;
          const prevPalettes = currentPalettes || [];
          const newPalette = { id: newId, ...newScheme };

          return [newPalette, ...prevPalettes];
        });
      }
    },
    [route.params]
  );
  return (
    <FlatList
      data={colorsPalettes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: palette }) => (
        <ColorPalettePreview
          name={palette.paletteName}
          colors={palette.colors.slice(0, 5)}
          onPress={() =>
            navigation.navigate('ColorsPaletteDetails', {
              name: palette.paletteName,
              colors: palette.colors,
            })
          }
        />
      )}
      style={styles.container}
      ItemSeparatorComponent={() => (
        <View style={styles.ColorsPaletteDetailsSeparator} />
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
            onPress={() => navigation.navigate('NewColorPalette')}
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
  ColorsPaletteDetailsSeparator: {
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
