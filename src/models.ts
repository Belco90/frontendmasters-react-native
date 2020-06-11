export type TColor = { colorName: string; hexCode: string };

export type RootStackParamList = {
  home: undefined;
  'color-palette': { name: string; colors: Array<TColor> };
};
