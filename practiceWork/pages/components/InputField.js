import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

//Defining colors to use in the styles
const colors = {
    offPink: '#a37c7c',
    lightGrey: '#B9B7BD',
    offWhite: '#F5F5F5',
    offRed: '#d65151',
    offBlack: '#544f4b',
  };
  
const InputField = ({label, error, onFocus = () => {}, ...props}) => {
const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{marginBottom: 10}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputText,
          {borderColor: error ? colors.offRed : isFocused ? colors.offBlack : colors.offPink},
        ]}>
        <TextInput
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{color: colors.offBlack, flex: 1}}
          {...props}
        />
      </View>
      <Text style={{color: colors.offRed, fontSize: 12}}>{error}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: colors.offPink,
  },
  inputText: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F2FFFD',
  },
});

export default InputField;
