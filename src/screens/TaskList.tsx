import React, { useEffect, useState } from 'react';
import { Divider, List, Text, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, SafeAreaView, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { SwipeableListItem } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createTaskList, deleteTaskList, fetchTaskLists } from '../store/TaskList/async-actions';

export default function TaskList() {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const dispatch = useAppDispatch();

    const [newListName, setNewListName] = useState('');

    useEffect(() => {
        dispatch(fetchTaskLists());
    }, [])

    const { taskList } = useAppSelector(state => state.taskList);

    const permanentList = taskList.filter(list => !list.deletable)
    const deletableList = taskList.filter(list => list.deletable)

    const handleAddList = () => {
        if (newListName.trim()) {
            dispatch(createTaskList(newListName.trim()));
            setNewListName('');
            Keyboard.dismiss();
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ marginVertical: 4 }}>
                    {permanentList.map((list) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Tasks', { list: list })} key={list.id}>
                            <List.Item title={list.name} titleStyle={{ color: '#fff', fontSize: 18, fontWeight: "700" }} left={props => <Icon {...props} color={list.iconColour} size={20} name={list.icon} />} />
                        </TouchableOpacity>
                    ))}
                </View>
                <Divider />
                <View style={{ marginVertical: 4 }}>
                    {deletableList.map((list) => (
                        <SwipeableListItem key={list.id} onDelete={() => dispatch(deleteTaskList(list.id))}>
                            <TouchableOpacity onPress={() => navigation.navigate('Tasks', { list: list })} key={list.id}>
                                <List.Item title={list.name} titleStyle={{ color: '#fff', fontSize: 18, fontWeight: "700" }} left={props => <Icon {...props} color={colors.surface} size={20} name="list" />} />
                            </TouchableOpacity>
                        </SwipeableListItem>
                    ))}
                </View>
            </ScrollView>
            <View>
                <TextInput onSubmitEditing={handleAddList} value={newListName} onChangeText={setNewListName} left={<TextInput.Icon color={colors.surface} icon='plus' size={20} />} style={{ margin: 8, backgroundColor: colors.background, fontSize: 18, fontWeight: "700" }} textColor={colors.surface} placeholderTextColor={'#fff'} placeholder='New List' />
            </View>
        </SafeAreaView>
    );
};