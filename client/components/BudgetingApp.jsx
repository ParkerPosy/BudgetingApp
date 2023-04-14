import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ADD_EXPENSE, VIEW_ALL_EXPENSES, VISUALIZE_EXPENSES } from '../assets/constants';

const BudgetingApp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title={ADD_EXPENSE} onPress={() => navigation.navigate(ADD_EXPENSE)} />
      </View>
      <View style={styles.button}>
        <Button title={VIEW_ALL_EXPENSES} onPress={() => navigation.navigate(VIEW_ALL_EXPENSES)} />
      </View>
      <View style={styles.button}>
        <Button title={VISUALIZE_EXPENSES} onPress={() => navigation.navigate(VISUALIZE_EXPENSES)} />
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
});

export default BudgetingApp;