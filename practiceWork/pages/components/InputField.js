import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const InputField = ({label, error, onFocus = () => {}, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{marginBottom: 10}}>
      <Text style={style.label}>{label}</Text>
      <View style={[style.inputText, {borderColor: error ? 'red': isFocused ? 'grey' : '#F2FFFD'}]}>
        <TextInput
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{color: 'black', flex: 1}}
          {...props}
        />
      </View>
      <Text style={{color:'red', fontSize: 12}}>{error}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: 'grey',
  },
  inputText: {
    backgroundColor: '#F2FFFD',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F2FFFD',
  },
});

export default InputField;
