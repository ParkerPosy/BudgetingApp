import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ADD_EXPENSE, BUDGETING_APP, VIEW_ALL_EXPENSES, VISUALIZE_EXPENSES } from './assets/constants';
import { ExpenseContext } from './assets/expenseContext';
import BudgetingApp from './components/BudgetingApp';
import AddExpense from './components/AddExpense';
import ViewAllExpenses from './components/ViewAllExpenses';
import VisualizeExpenses from './components/VisualizeExpenses';

const Stack = createNativeStackNavigator();

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    fetch('http://10.19.24.225:3000/all-expenses')
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, loading, fetchData }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={BUDGETING_APP} component={BudgetingApp} />
          <Stack.Screen name={ADD_EXPENSE} component={AddExpense} />
          <Stack.Screen name={VIEW_ALL_EXPENSES} component={ViewAllExpenses} />
          <Stack.Screen name={VISUALIZE_EXPENSES} component={VisualizeExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpenseContext.Provider>
  );
};

export default App;
