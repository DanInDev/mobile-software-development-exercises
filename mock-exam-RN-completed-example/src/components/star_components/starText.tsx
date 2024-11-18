import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import colors from '../../constants/colors';

interface StarTextProps extends TextProps {
  children: React.ReactNode;
}

const StarText: React.FC<StarTextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Starjedi', 
    fontSize: 20,
    color: colors.primary 
  },
});

export default StarText;