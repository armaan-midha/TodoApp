import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Modal, Portal, Text, useTheme } from 'react-native-paper';

const screenHeight = Dimensions.get('window').height;

interface BottomSheetModalProps {
    visible: boolean;
    hideModal: () => void;
    title: string;
    options: string[];
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({ visible, hideModal, title, options }) => {
    const { colors } = useTheme();
    const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: screenHeight / 2,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: screenHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }], backgroundColor: colors.background }]}>
                    <Text style={[styles.title, { color: colors.surface }]}>{title}</Text>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} style={styles.option} onPress={hideModal}>
                            <Text style={[styles.optionText, { color: colors.surface }]}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.doneButton} onPress={hideModal}>
                        <Text style={[styles.doneText, { color: colors.primary }]}>Done</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        height: '90%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    option: {
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 18,
    },
    doneButton: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    doneText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BottomSheetModal;
