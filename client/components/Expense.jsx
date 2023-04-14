import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { ExpenseContext } from '../assets/expenseContext';

const Expense = ({ item }) => {
  const { fetchData } = useContext(ExpenseContext);
  const [cost, setCost] = useState(item.cost);
  const [type, setType] = useState(item.type);

  const deleteExpense = (id) => {
    fetch('http://10.19.24.225:3000/delete-expense', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).catch(error => console.error('Error deleting expense:', error))
      .finally(() => fetchData());
  };

  useEffect(() => {
    // only send the put request after 2000ms so that the network isn't flooded
    // otherwise known as a debounced input
    const getData = setTimeout(() => {
      fetch('http://10.19.24.225:3000/update-expense', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: item._id, cost, type }),
      }).catch(error => console.error('Error updating expense:', error))
        .finally(() => fetchData());
    }, 2000);

    // cleanup function
    return () => clearTimeout(getData);
  }, [cost, type]);

  return (
    <View style={styles.listItem}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{'Cost: $'}</Text>
        <TextInput
          multiline
          keyboardType='numeric'
          style={styles.text}
          value={cost.toString()}
          onChangeText={text => setCost(text)}
        />
      </View>
      <View style={styles.infoContainer}>
        <TextInput
          multiline
          numberOfLines={3}
          style={styles.text}
          value={type}
          onChangeText={text => setType(text)}
        />
      </View>
      <TouchableOpacity style={styles.delete} onPress={() => deleteExpense(item._id)}>
        <Text style={styles.x}>{'\u2716'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginVertical: '2%',
    padding: '3%',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  x: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  expenseText: {
    fontSize: 16,
    maxWidth: '80%',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  infoContainer: {
    flexDirection: 'row',
    width: '45%',
  },
  delete: {
    width: '10%',
    margin: 'auto',
    justifyContent: 'center',
  },
});

export default Expense;