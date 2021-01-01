import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class WriteStoryScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      story: "",
    };
  }

  submitStory = () => {
    db.collection("stories").add({
      "title": this.state.title,
      "author": this.state.author,
      "date": firebase.firestore.Timestamp.now().toDate(),
      "story": this.state.story,
    });

    this.setState({
      title: "",
      author: "",
      story: "",
    });

    var message = "Story Submitted!";
    Platform.OS === "android" 
    ? ToastAndroid.show(message, ToastAndroid.SHORT)
    : Alert.alert(message);
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} enabled>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Title of the Story"
              placeholderTextColor="#eeeeee"
              onChangeText={(text) => {
                this.setState({ title: text });
              }}
              value={this.state.title}
            />
            <TextInput
              style={styles.input}
              placeholder="Author of the Story"
              placeholderTextColor="#eeeeee"
              onChangeText={(text) => {
                this.setState({ author: text });
              }}
              value={this.state.author}
            />
            <TextInput
              style={styles.storyInput}
              placeholder="Story"
              placeholderTextColor="#eeeeee"
              multiline={true}
              onChangeText={(text) => {
                this.setState({ story: text });
              }}
              value={this.state.story}
            />
            <TouchableOpacity style={styles.button} onPress={this.submitStory}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
    height: 669
  },

  input: {
    height: 40,
    width: 300,
    borderColor: "#00adb5",
    borderWidth: 2,
    fontWeight: "bold",
    alignSelf: "center",
    paddingLeft: 13,
    marginTop: 80,
    color: "#eeeeee",
  },

  storyInput: {
    height: 120,
    width: 300,
    borderColor: "#00adb5",
    borderWidth: 2,
    alignSelf: "center",
    paddingLeft: 13,
    marginTop: 90,
    color: "black"
  },

  button: {
    alignSelf: "center",
    width: 115,
    height: 40,
    borderRadius: 10,
    borderColor: "#393e46",
    borderWidth: 1,
    marginTop: 30,
    backgroundColor: "#00adb5",
  },

  buttonText: {
    alignSelf: "center",
    color: "#eeeeee",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    marginTop: 9,
  },
});
