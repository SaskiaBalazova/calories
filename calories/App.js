import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Picker} from '@react-native-picker/picker';


export default function App() {

  const [weight, setWeight] = useState(0);
  const [intensity, setIntensity] = useState(1.3);
  const [gender, setGender] = useState('male');
  const [calories, setCalories] = useState(0);

  const intensities = Array();
  intensities.push({label: 'light', value: 1.3});
  intensities.push({label: 'usual', value: 1.5});
  intensities.push({label: 'moderate', value: 1.7});
  intensities.push({label: 'hard', value: 2.0});
  intensities.push({label: 'very hard', value: 2.2});

/*   const genders = Array();
  genders.push({label: 'Male', value: 'male'});
  genders.push({label: 'Female', value: 'female'}); */

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  function calculate() {
    let result = 0;
    if (gender === 'male') {
      result = (879 + 10.2 * weight) * intensity;
    }
    else {
      result = (795 + 7.18 * weight) * intensity;
    }
    setCalories(result);
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setWeight(text)}
          placeholder='Enter weight in kilograms'
          keyboardType='numeric'></TextInput>
      </View>

      <View style={styles.field}>
        <Text>Intenstity</Text>
        <Picker style={styles.intensity}
            onValueChange={(itemValue) => setIntensity(itemValue)}
            selectedValue={intensity}
          >
            {intensities.map((intensity,index) => (
              <Picker.Item key={index} label={intensity.label} value={intensity.value}/>
            ))
          }
        </Picker>
      </View>

      <View style={styles.field}>
      <Text>Gender</Text>
      <RadioForm
          style={styles.radio}
          buttonSize = {10}
          radio_props={genders}
          initial={0}
          onPress={(value) => {setGender(value)}}
        />
        <Text>{calories.toFixed(0)}</Text>
        </View>
        
        <Button onPress={calculate} title='Calculate'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  field: {
    margin: 10,
  },
  input: {
    marginLeft: 10,
  },
  radio: {
    marginTop: 10,
    marginBottom: 10,
  }
});
