import React from 'react';
import { Divider, List, Text, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { SwipeableListItem } from '../components';


const permanentList = [
    {
        id: 1,
        name: "My Day",
        icon: "sun",
        iconColour: "#686D76"
    },
    {
        id: 2,
        name: "Important",
        icon: "star",
        iconColour: "#F4CE14"
    },
    {
        id: 3,
        name: "Planned",
        icon: "calendar",
        iconColour: "#CBFFA9"
    },
    {
        id: 4,
        name: "Tasks",
        icon: "home",
        iconColour: "#C8ACD6"
    },
    {
        id: 5,
        name: "Flagged",
        icon: "flag",
        iconColour: "#FF8989"
    }
]

const createdList = [
    {
        id: 1,
        name: "UAT issues"
    },
    {
        id: 2,
        name: "PROD issues"
    },
]

export default function TaskList() {
    const navigation = useNavigation();
    const { colors } = useTheme();


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
                    {createdList.map((list) => (
                        <SwipeableListItem key={list.id} onDelete={() => console.log(list.id)}>
                            <TouchableOpacity onPress={() => navigation.navigate('Tasks', { list: list })} key={list.id}>
                                <List.Item title={list.name} titleStyle={{ color: '#fff', fontSize: 18, fontWeight: "700" }} left={props => <Icon {...props} color={colors.surface} size={20} name="list" />} />
                            </TouchableOpacity>
                        </SwipeableListItem>
                    ))}
                </View>
            </ScrollView>
            <View>
                <TextInput left={<TextInput.Icon color={colors.surface} icon='plus' size={20} />} style={{ margin: 8, backgroundColor: colors.background, fontSize: 18, fontWeight: "700" }} textColor={colors.surface} placeholderTextColor={'#fff'} placeholder='New List' />
            </View>
        </SafeAreaView>
    );
};