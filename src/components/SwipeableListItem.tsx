import React, { ReactNode } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

interface SwipeableListItemProps {
    children: ReactNode;
    onDelete: () => void;
}

const SwipeableListItem: React.FC<SwipeableListItemProps> = ({ children, onDelete }) => {
    const renderRightActions = (progress: Animated.AnimatedInterpolation<string | number>, dragAnimatedValue: Animated.AnimatedInterpolation<string | number>) => {
        const scale = dragAnimatedValue.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <RectButton style={styles.rightAction} onPress={onDelete}>
                <Animated.View style={[styles.actionIcon, { transform: [{ scale }] }]}>
                    <Icon name="trash-2" size={30} color="#fff" />
                </Animated.View>
            </RectButton>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            {children}
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    rightAction: {
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 16,
        padding: 4,
        margin: 3
    },
    actionIcon: {
        paddingHorizontal: 10,
    } as ViewStyle,
});

export default SwipeableListItem;
