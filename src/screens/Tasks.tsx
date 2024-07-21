import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ReusbaleTaskList } from '../components';

const tasks = [
  {
    "id": 102,
    "title": "Fourth task",
    "description": "Task id is passed as null so it should come under default task id.",
    "dueDate": "2024-07-23T10:00:00",
    "reminder": "2024-07-20T18:00:00",
    "isRecurring": false,
    "recurrencePattern": null,
    "createdAt": "2024-07-18",
    "updatedAt": "2024-07-18",
    "done": true,
    "recurring": false
  },
  {
    "id": 252,
    "title": "Complete Project Proposalrgregrtewtewrt rtrewtrewterwt trewtrewtewrterwt",
    "description": "Write a detailed proposal for the upcoming project.",
    "dueDate": "2024-07-16T10:00:00",
    "reminder": "2024-07-15T18:00:00",
    "isRecurring": false,
    "recurrencePattern": null,
    "createdAt": "2024-07-20",
    "updatedAt": "2024-07-20",
    "done": false,
    "recurring": true
  }
];

export default function Tasks() {
  const { colors } = useTheme();
  const route = useRoute();
  const { list } = route.params;
  const navigation = useNavigation();

  const incompleteTasks = tasks.filter(task => !task.done);
  const completedTasks = tasks.filter(task => task.done);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: list.iconColour || colors.primary,
    });
  }, [navigation, list.iconColour, colors.primary, colors.surface]);

  const handleTaskPress = (task) => {
    console.log(task);

    navigation.navigate('TaskConfig', { task, list });
  };

  const handleDelete = (taskId: number) => {
    console.log(taskId);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: "900", color: list.iconColour || colors.surface }}>{list.name}</Text>
        </View>

        <ReusbaleTaskList tasks={incompleteTasks} list={list} colors={colors} onTaskPress={handleTaskPress} onDelete={handleDelete} />

        <View style={{ marginTop: 16, padding: 8, marginLeft: 2, borderRadius: 10, backgroundColor: '#323232', alignSelf: 'flex-start' }}>
          <Text style={{ fontWeight: "400", color: list.iconColour || colors.surface, fontSize: 16 }}>Completed</Text>
        </View>

        <ReusbaleTaskList tasks={completedTasks} list={list} colors={colors} onTaskPress={handleTaskPress} onDelete={handleDelete} />
      </ScrollView>
      <View>
        <TextInput
          left={
            <TextInput.Icon
              color={colors.surface}
              icon='plus'
              size={20} />}
          style=
          {{
            margin: 8,
            backgroundColor:
              colors.background,
            fontSize: 18,
            fontWeight: "700"
          }}
          textColor={colors.surface}
          placeholderTextColor={'#fff'}
          placeholder='Add a Task' />
      </View>
    </SafeAreaView>
  );
}
