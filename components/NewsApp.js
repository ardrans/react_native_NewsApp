import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const NewsApp = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('tesla'); 

  const getYesterdaysDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
  };

  const getTodaysDate = () => {
    return new Date();
  };

  const [fromDate, setFromDate] = useState(getYesterdaysDate()); 
  const [toDate, setToDate] = useState(getTodaysDate()); 
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false); 

  const fetchData = async (from, to) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&sortBy=publishedAt&apiKey=49c413cf117c44dbb1de7947138127a9`
      );
      setData(response.data.articles);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    fetchData(formattedFromDate, formattedToDate);
  }, [query]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
    }
  };

  const handleFilter = () => {
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    fetchData(formattedFromDate, formattedToDate);
  };

  const onFromDateChange = (event, selectedDate) => {
    setShowFromDatePicker(false); 
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onToDateChange = (event, selectedDate) => {
    setShowToDatePicker(false); 
    if (selectedDate) {
      setToDate(selectedDate); 
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the NEWS App</Text>
      <Button
        title="Open Camera"
        onPress={() => navigation.navigate('CameraScreen')}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for news..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <Text style={styles.dateText}>{`Showing news from ${formatDate(fromDate)} to ${formatDate(toDate)}`}</Text>

      <View style={styles.datePickerContainer}>
        <Button title="From Date" onPress={() => setShowFromDatePicker(true)} />
        {showFromDatePicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="default"
            onChange={onFromDateChange}
          />
        )}

        <Button title="To Date" onPress={() => setShowToDatePicker(true)} />
        {showToDatePicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="default"
            onChange={onToDateChange} 
          />
        )}
      </View>

      <Button title="Filter News by Date" onPress={handleFilter} />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.articleContainer}
            onPress={() => navigation.navigate('NewsDetail', { article: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            )}
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 32,
    color: 'blue',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  articleContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default NewsApp;
