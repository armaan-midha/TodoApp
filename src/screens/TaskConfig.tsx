import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Divider, List, Text, TextInput, useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { AnimatedTickIcon } from '../components';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheetModal from '../components/BottomSheetModal';

const TaskConfig = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const { task, list } = route.params;

  const [title, setTitle] = useState(task.title);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalOptions, setModalOptions] = useState<string[]>([]);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleTitleSubmit = () => {
    // Here you would update the task title in your state or send it to your backend
    console.log(`Updated title: ${title}`);
  };

  const showModal = (title: string, options: string[]) => {
    setModalTitle(title);
    setModalOptions(options);
    setModalVisible(true);
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
              textDecorationLine: task.done ? 'line-through' : 'none',
            }}
          />
        }
        left={() => (
          <AnimatedTickIcon isDone={task.done} onPress={() => console.log(task.id)} iconColour={colors.surface} />
        )}
        right={() => (
          <TouchableOpacity onPress={() => console.log(task.id)}>
            <AntIcon color={colors.surface} size={24} name={task.recurring ? 'star' : 'staro'} />
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
          Created {task.createdAt}
        </Text>
        <TouchableOpacity onPress={() => console.log('Delete task')}>
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
