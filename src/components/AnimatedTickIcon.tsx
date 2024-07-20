import React, { useState } from 'react';
import { TouchableOpacity, Animated, StyleSheet, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';


type AnimatedTickIconProps = {
    onPress: () => void;
    iconColour: string;
    isDone: boolean;
};

const AnimatedTickIcon: React.FC<AnimatedTickIconProps> = ({ onPress, iconColour, isDone }) => {
    const [checked, setChecked] = useState(isDone);
    const animation = new Animated.Value(0);

    const handlePress = () => {
        setChecked(prevChecked => !prevChecked);
        Animated.timing(animation, {
            toValue: checked ? 0 : 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true, // Use native driver for better performance
        }).start();
        onPress();
    };

    const animatedStyle = {
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2], // Scale up when checked
                }),
            },
        ],
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Animated.View style={[animatedStyle, {paddingLeft: 12}]}>
                {
                    checked ?
                        <AntIcon name='checkcircle' size={24} color={iconColour} /> :
                        <Icon name='circle' size={24} color={iconColour} />
                }

            </Animated.View>
        </TouchableOpacity>
    );
};

export default AnimatedTickIcon;

const styles = StyleSheet.create({
    icon: {
        fontSize: 24,
    },
});
