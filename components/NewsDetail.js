import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const NewsDetail = ({ route }) => {
  const { article } = route.params;

 
    const youtubeNewsURL = 'https://www.youtube.com/watch?v=Ko18SgceYX8'; 
  

  return (
    
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}
      <Text style={styles.author}>{article.author ? `By ${article.author}` : ''}</Text>
      <Text style={styles.publishedAt}>{new Date(article.publishedAt).toLocaleDateString()}</Text>
      <Text style={styles.content}>{article.content}</Text>
      <View style={styles.container}>
      <Text style={styles.title}>Scan to watch YouTube News</Text>
      <QRCode
        value={youtubeNewsURL} 
        size={200}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 15,
  },
  author: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 10,
  },
  publishedAt: {
    color: '#888',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
});

export default NewsDetail;
