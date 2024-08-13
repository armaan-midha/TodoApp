import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Divider, List, Text, TextInput, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AnimatedTickIcon } from '../components';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheetModal from '../components/BottomSheetModal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteTask, fetchTask, updateTask } from '../store/Task/async-actions';
import { TaskType } from '../store/Task';

const TaskConfig = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const { task, list } = route.params;
  const navigation = useNavigation();

  const [title, setTitle] = useState(task.title);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalOptions, setModalOptions] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { currentTask } = useAppSelector(state => state.task);

  useEffect(() => {
    if (task.id) {
      dispatch(fetchTask({ taskId: task.id }));
    }
  }, [task.id, dispatch]);

  useEffect(() => {
    if (currentTask.title) {
      setTitle(currentTask.title);
    }
  }, [currentTask.title]);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleTitleSubmit = () => {
    dispatch(updateTask({ taskListId: list.id, task: { id: currentTask.id, title } }));
  };

  const showModal = (title: string, options: string[]) => {
    setModalTitle(title);
    setModalOptions(options);
    setModalVisible(true);
  };

  const handleDone = () => {
    dispatch(updateTask({ taskListId: list.id, task: { id: currentTask.id, done: !currentTask.done } }));
  };

  const handleImportant = () => {
    dispatch(updateTask({ taskListId: list.id, task: { id: currentTask.id, important: !currentTask.important } }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <List.Item
        titleNumberOfLines={1000}
        title={
          <TextInput
            value={title}
            onChangeText={handleTitleChange}
            onSubmitEditing={handleTitleSubmit}
            onBlur={handleTitleSubmit}
            autoFocus
            multiline
            placeholderTextColor="#fff"
            textColor='#fff'
            style={{
              color: '#fff',
              fontSize: 22,
              fontWeight: '700',
              backgroundColor: colors.background,
              textDecorationLine: currentTask.done ? 'line-through' : 'none',
            }}
          />
        }
        left={() => (
          <AnimatedTickIcon isDone={currentTask.done} onPress={handleDone} iconColour={colors.surface} />
        )}
        right={() => (
          <TouchableOpacity onPress={handleImportant}>
            <AntIcon color={colors.surface} size={24} name={currentTask.important ? 'star' : 'staro'} />
          </TouchableOpacity>
        )}
      />
      <Divider />
      <ScrollView contentContainerStyle={{ margin: 10, gap: 12, flexGrow: 1 }}>
        <List.Item
          titleStyle={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '700',
          }}
          title="Remind Me"
          left={() => <AntIcon color='#fff' size={20} name='bells' />}
          onPress={() => showModal('Remind Me', ['Today', 'Tomorrow', 'Next Week'])}
        />
        <List.Item
          titleStyle={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '700',
          }}
          title="Add Due Date"
          left={() => <AntIcon color='#fff' size={20} name='calendar' />}
          onPress={() => showModal('Add Due Date', ['Today', 'Tomorrow', 'Next Week'])}
        />
        <List.Item
          titleStyle={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '700',
          }}
          title="Repeat"
          left={() => <Icon color='#fff' size={20} name='repeat' />}
          onPress={() => showModal('Repeat', ['Daily', 'Weekly', 'Monthly'])}
        />
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'space-between' }}>
        <Text
          style={{
            color: '#fff',
            marginRight: 8,
            fontSize: 18,
            fontWeight: '700',
          }}>
          Created {currentTask.createdAt}
        </Text>
        <TouchableOpacity onPress={() => {
          dispatch(deleteTask({ id: currentTask.id, taskListId: list.id }));
          navigation.navigate('Tasks', { list });
        }}>
          <AntIcon name='delete' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
        title={modalTitle}
        options={modalOptions}
      />
    </SafeAreaView>
  );
};

export default TaskConfig;
