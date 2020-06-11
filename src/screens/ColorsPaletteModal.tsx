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
import { Formik } from 'formik';
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

const initialFormValues: FormValues = {
  [FormFields.name]: '',
  [FormFields.colors]: [],
};

const validateForm = (values: FormValues) => {
  const errors: {
    [FormFields.name]?: string;
    [FormFields.colors]?: string;
  } = {};

  if (!values[FormFields.name].trim()) {
    errors[FormFields.name] = 'Enter some scheme name';
  }

  if (values[FormFields.colors].length < 3) {
    errors[FormFields.colors] = 'Select 3 colors min';
  }

  return errors;
};

const ColorsPaletteModal = () => {
  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={(values) => console.log('onSubmit:', values)}
      validate={validateForm}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit: onSubmit,
        values,
        errors,
        isValid,
        setFieldValue,
      }) => {
        const handleSubmit = () => {
          if (isValid) {
            onSubmit();
          } else {
            Alert.alert(
              'Please fix form errors',
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
                    value={values[FormFields.colors].some(
                      ({
                        colorName: selectedColorName,
                      }: {
                        colorName: string;
                      }) => selectedColorName === item.colorName
                    )}
                    onValueChange={(isSelected) => {
                      const currentColors: Array<Color> =
                        values[FormFields.colors];
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
              ItemSeparatorComponent={() => (
                <View style={styles.colorsSeparator} />
              )}
            />
            <View>
              <Button title="Submit" onPress={() => handleSubmit()} />
            </View>
          </View>
        );
      }}
    </Formik>
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

export default ColorsPaletteModal;
