import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setCapturedPhoto(photo.uri);
    }
  };

  return (
    <View style={styles.cameraContainer}>
      {capturedPhoto ? (
        <Image source={{ uri: capturedPhoto }} style={styles.capturedImage} />
      ) : (
        <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)} />
      )}
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.captureText}>Capture</Text>
      </TouchableOpacity>
      {capturedPhoto && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setCapturedPhoto(null)}
        >
          <Text style={styles.resetText}>Retake</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  capturedImage: {
    width: '100%',
    height: '80%',
  },
  captureButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  captureText: {
    fontSize: 18,
    color: '#000',
  },
  resetButton: {
    backgroundColor: '#ff3333',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resetText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default CameraScreen;
