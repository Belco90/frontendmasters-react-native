import React from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Switch,
} from 'react-native';
import { FormikProps, FormikErrors, withFormik } from 'formik';
import COLORS_PRESET from '../colors-preset';
import { Color } from '../models';

enum FormFields {
  name = 'name',
  colors = 'colors',
}

interface FormValues {
  [FormFields.name]: string;
  [FormFields.colors]: Array<Color>;
}

const ColorsPaletteModal = (props: FormikProps<FormValues>) => {
  const {
    isValid,
    errors,
    values,
    handleSubmit: onSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = props;

  const handleSubmit = () => {
    if (isValid) {
      onSubmit();
    } else {
      Alert.alert(
        'Please fix form errors:',
        Object.values(errors).reduce(
          (previousValue, currentValue) =>
            `${previousValue}\n- ${currentValue}`,
          ''
        ) as string
      );
    }
  };

  return (
    <View style={styles.root}>
      <View>
        <Text>Color scheme name</Text>
        <TextInput
          onChangeText={handleChange(FormFields.name)}
          onBlur={handleBlur(FormFields.name)}
          value={values.name}
          style={styles.input}
        />
      </View>
      <FlatList
        data={COLORS_PRESET}
        renderItem={({ item }) => (
          <View style={styles.colorOption}>
            <Text>{item.colorName}</Text>
            <Switch
              value={values.colors.some(
                ({ colorName: selectedColorName }: { colorName: string }) =>
                  selectedColorName === item.colorName
              )}
              onValueChange={(isSelected) => {
                const currentColors: Array<Color> = values.colors;
                let newColorsSelected;

                if (isSelected) {
                  newColorsSelected = [...currentColors, item];
                } else {
                  newColorsSelected = currentColors.filter(
                    ({ colorName }) => colorName !== item.colorName
                  );
                }
                setFieldValue(FormFields.colors, newColorsSelected);
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.colorName}
        style={styles.colorsList}
        ItemSeparatorComponent={() => <View style={styles.colorsSeparator} />}
      />
      <View>
        <Button title="Submit" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 15,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  colorsList: {
    marginVertical: 10,
  },
  colorOption: {
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorsSeparator: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

export default withFormik<{}, FormValues>({
  handleSubmit: (values) => console.log('onSubmit:', values),
  mapPropsToValues: () => ({
    name: '',
    colors: [],
  }),
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};

    if (!values.name.trim()) {
      errors.name = 'Enter some scheme name';
    }

    if (values.colors.length < 3) {
      errors.colors = 'Select 3 colors min';
    }

    return errors;
  },
})(ColorsPaletteModal);
