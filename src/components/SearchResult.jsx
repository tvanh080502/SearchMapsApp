import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const SearchResult = ({ result, keyword }) => {
  const openMaps = () => {
    const { position } = result;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={openMaps} style={styles.resultContainer}>
      <Text style={styles.resultText}>
        {result.title.replace(new RegExp(`(${keyword})`, 'gi'), (match) => `*${match}*`)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultText: {
    fontSize: 16,
  },
});

export default SearchResult;
