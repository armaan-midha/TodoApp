import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { SwipeableListItem, AnimatedTickIcon } from '.';

type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    reminder: string;
    isRecurring: boolean;
    recurrencePattern: string | null;
    createdAt: string;
    updatedAt: string;
    done: boolean;
    recurring: boolean;
};

type TaskListProps = {
    tasks: Task[];
    list: {
        iconColour: string;
        name: string;
    };
    colors: {
        surface: string;
        primary: string;
        background: string;
    };
    onTaskPress: (task: Task) => void;
    onDelete: (taskId: number) => void;
};

const ReusbaleTaskList: React.FC<TaskListProps> = ({ tasks, list, colors, onTaskPress, onDelete }) => {
    const navigation = useNavigation();

    return (
        <View style={{ marginVertical: 4 }}>
            {tasks.map((task) => (
                <SwipeableListItem key={task.id} onDelete={() => onDelete(task.id)}>
                    <TouchableOpacity onPress={() => onTaskPress(task)} key={task.id} style={{ backgroundColor: '#323232', padding: 4, margin: 3, borderRadius: 10 }}>
                        <List.Item
                            titleNumberOfLines={1000}
                            title={task.title}
                            titleStyle={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: "700",
                                textDecorationLine: task.done ? 'line-through' : 'none',
                            }}
                            left={() => (
                                <AnimatedTickIcon isDone={task.done} onPress={() => console.log(task.id)} iconColour={list.iconColour || colors.surface} />
                            )}
                            right={() => (
                                <TouchableOpacity onPress={() => console.log(task.id)}>
                                    <AntIcon color={list.iconColour || colors.surface} size={24} name={task.recurring ? 'star' : 'staro'} />
                                </TouchableOpacity>
                            )} />
                    </TouchableOpacity>
                </SwipeableListItem>
            ))}
        </View>
    );
};

export default ReusbaleTaskList;
