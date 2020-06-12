export type Color = { colorName: string; hexCode: string };

export type ColorsPalette = {
  id: number;
  paletteName: string;
  colors: Array<Color>;
};

export type RootStackParamList = {
  Main: MainStackParamList;
  NewColorPalette: undefined;
};

export type MainStackParamList = {
  Home: { newColorsPalette: Omit<ColorsPalette, 'id'> } | undefined;
  ColorsPaletteDetails: { name: string; colors: Array<Color> };
};

export type AppStackParamList = RootStackParamList & MainStackParamList;
