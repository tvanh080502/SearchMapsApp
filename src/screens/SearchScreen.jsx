import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { searchAddress } from '../api/hereAPI';

const SearchScreen = () => {
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState('');

  const handleSearch = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    setKeyword(query);
    try {
      const items = await searchAddress(query);
      setResults(items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SearchResult result={item} keyword={keyword} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default SearchScreen;
