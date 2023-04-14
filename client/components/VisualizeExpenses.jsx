import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { ExpenseContext } from '../assets/expenseContext';

const VisualizeExpenses = () => {
  const { expenses, loading, fetchData } = useContext(ExpenseContext);
  useEffect(() => {
    fetchData();
  }, []);

  const uniqueCategoriesAndValues = expenses.reduce(
    (accumulator, currentValue) => accumulator[currentValue.type] ?? false
      ? { ...accumulator, [currentValue.type]: accumulator[currentValue.type] + currentValue.cost }
      : { ...accumulator, [currentValue.type]: currentValue.cost }
    , {});
  let pieChartData = [];
  for (const [category, value] of Object.entries(uniqueCategoriesAndValues)) {
    pieChartData.push({ x: category, y: value, label: `${category}: $${value}` });
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading expenses...</Text>
      ) : (
        <VictoryPie
          colorScale={'qualitative'}
          data={pieChartData}
          labelPlacement={'parallel'}
          padding={125}
          labelRadius={({ radius }) => radius + 20 }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VisualizeExpenses;