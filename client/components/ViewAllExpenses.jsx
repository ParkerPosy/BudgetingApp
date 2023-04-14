import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { KeyboardSpacer } from 'react-native-keyboard-spacer-fixed';
import Expense from './Expense';
import { ExpenseContext } from '../assets/expenseContext';

const ViewAllExpenses = () => {
  const { expenses, loading, fetchData } = useContext(ExpenseContext);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading expenses...</Text>
      ) : (
        <View style={styles.list}>
          <FlatList
            data={expenses}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <Expense item={item} />}
          />
        </View>
      )}
      <KeyboardSpacer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: '#F5F5F5',
    height: '90%',
    margin: 20,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});

export default ViewAllExpenses;