import { View, Text, SafeAreaView, ScrollView, Keyboard } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ReusbaleTaskList } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createTask, deleteTask, fetchTasks, updateTask } from '../store/Task/async-actions';
import { TaskType } from '../store/Task';

export default function Tasks() {
  const { colors } = useTheme();
  const route = useRoute();
  const { list } = route.params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [newTaskName, setNewTaskName] = useState('');


  useEffect(() => {
    dispatch(fetchTasks({ taskListId: list.id }))
  }, [list])

  const { tasks } = useAppSelector(state => state.task);

  const incompleteTasks = tasks?.filter(task => !task.done);

  const completedTasks = tasks?.filter(task => task.done);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: list.iconColour || colors.primary,
    });
  }, [navigation, list.iconColour, colors.primary, colors.surface]);

  const handleTaskPress = (task: TaskType) => {
    navigation.navigate('TaskConfig', { task, list });
  };

  const handleDelete = (taskId: number) => {
    dispatch(deleteTask({ id: taskId, taskListId: list.id }))
  };

  const handleDone = (task: Partial<TaskType>) => {
    dispatch(updateTask({ taskListId: list.id, task: { done: !task.done, id: task.id } }))
  };

  const handleImportant = (task: Partial<TaskType>) => {
    dispatch(updateTask({ taskListId: list.id, task: { important: !task.important, id: task.id } }))
  };

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      dispatch(createTask({ task: { title: newTaskName.trim() }, taskListId: list.id }));
      setNewTaskName('');
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: "900", color: list.iconColour || colors.surface }}>{list.name}</Text>
        </View>

        <ReusbaleTaskList tasks={incompleteTasks || []} list={list} colors={colors} onTaskPress={handleTaskPress} onDelete={handleDelete} onLeftIconPress={handleDone} onRightIconPress={handleImportant} />

        <View style={{ marginTop: 16, padding: 8, marginLeft: 2, borderRadius: 10, backgroundColor: '#323232', alignSelf: 'flex-start' }}>
          <Text style={{ fontWeight: "400", color: list.iconColour || colors.surface, fontSize: 16 }}>Completed</Text>
        </View>

        <ReusbaleTaskList tasks={completedTasks || []} list={list} colors={colors} onTaskPress={handleTaskPress} onDelete={handleDelete} onLeftIconPress={handleDone} onRightIconPress={handleImportant} />
      </ScrollView>
      <View>
        <TextInput
          onSubmitEditing={handleAddTask} value={newTaskName} onChangeText={setNewTaskName}
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
