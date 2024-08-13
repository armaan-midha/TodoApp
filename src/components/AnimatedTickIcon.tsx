import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';

type AnimatedTickIconProps = {
    onPress: () => void;
    iconColour: string;
    isDone: boolean;
};

const AnimatedTickIcon: React.FC<AnimatedTickIconProps> = ({ onPress, iconColour, isDone }) => {
    const animation = useRef(new Animated.Value(isDone ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isDone ? 1 : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, [isDone]);

    const handlePress = () => {
        onPress();
    };

    const animatedStyle = {
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                }),
            },
        ],
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Animated.View style={[animatedStyle, { paddingLeft: 12 }]}>
                {isDone ?
                    <AntIcon name='checkcircle' size={24} color={iconColour} /> :
                    <Icon name='circle' size={24} color={iconColour} />
                }
            </Animated.View>
        </TouchableOpacity>
    );
};

export default AnimatedTickIcon;
