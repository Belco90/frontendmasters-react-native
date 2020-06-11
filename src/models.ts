export type Color = { colorName: string; hexCode: string };

export type ColorsPalette = {
  id: number;
  paletteName: string;
  colors: Array<Color>;
};

export type RootStackParamList = {
  main: MainStackParamList;
  newColorPalette: undefined;
};

export type MainStackParamList = {
  home: undefined;
  colorPalette: { name: string; colors: Array<Color> };
};
