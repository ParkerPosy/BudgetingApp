import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

const AddExpense = () => {
  const [cost, setCost] = useState('');
  const [type, setType] = useState('');

  const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  const handleAddExpense = () => {
    if (isNumeric(cost)) {
      let formattedType = type.trim().toLowerCase();
      formattedType = formattedType.charAt(0).toUpperCase() + formattedType.slice(1);
      fetch('http://10.19.24.225:3000/send-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cost, type: formattedType }),
      }).catch(error => {
        Alert.alert('Error adding expense', error);
        console.error('Error adding expense:', error);
      }).finally(() => {
        setCost('');
        setType('');
      });
    } else {
      Alert.alert('Expense must be a number');
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder={'Money spent'}
        value={cost}
        onChangeText={text => setCost(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={'Expense category/type'}
        value={type}
        onChangeText={text => setType(text)}
      />
      <View style={styles.button}>
        <Button disabled={!cost || !type} title={'Add Expense'} onPress={() => handleAddExpense()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginVertical: '3%',
    marginHorizontal: '10%',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C0C0C0',
    marginVertical: '3%',
    marginHorizontal: '10%',
  },
});

export default AddExpense;