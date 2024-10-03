import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';
import { searchAddress } from '../api/hereAPI';
import { Linking } from 'react-native';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Gọi API với debounce 1s
  const handleSearch = debounce(async (text) => {
    if (text) {
      try {
        const response = await searchAddress(text);
        setResults(response); // Gán kết quả vào state
      } catch (error) {
        // console.error(error);
      }
    } else {
      setResults([]);
    }
  }, 1000);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  // Mở Google Maps với URL
  const openInMaps = (lat, lon) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    Linking.openURL(url);
  };

  const highlightKeyword = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <Text>
        {parts.map((part, index) => (
          <Text key={index} style={part.toLowerCase() === keyword.toLowerCase() ? styles.highlight : {}}>
            {part}
          </Text>
        ))}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter keyword"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Hiển thị danh sách kết quả */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultContainer} onPress={() => openInMaps(item.position.lat, item.position.lng)}>
            <Icon name="location-sharp" size={20} color="#000" style={styles.locationIcon} />
            <View style={styles.resultContent}>
              {highlightKeyword(item.title, query)}
              <Text style={styles.addressText}>{item.address.label}</Text>
            </View>
            <Icon name="navigate" size={20} color="#000" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 20,
    height: 45,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  locationIcon: {
    marginRight: 10,
  },
  resultContent: {
    flex: 1,
  },
  addressText: {
    fontSize: 12,
    color: '#777',
  },
  highlight: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SearchBar;
