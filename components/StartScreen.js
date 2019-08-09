import React, { Fragment } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet
} from "react-native";
import note from "../assets/note.jpg";
import { Header } from "react-native-elements";

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Fundamentals",
      sessions: []
    };
  }
  static navigationOptions = {
    title: "New"
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setHidden(true);
    });
  }

  render() {
    return (
      <Fragment>
        <Header
          containerStyle={{ height: 50, paddingTop: 0 }}
          backgroundColor='#6b52ae'
          leftComponent={
              <TouchableOpacity onPress={this.props.navigation.openDrawer}>
              <Text style={styles.hamburger}>&#9776;</Text>
            </TouchableOpacity>
          }
          centerComponent={{ text: "Tremolo", style: { color: "#fff", fontSize: 24 } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <View style={styles.view}>
          <Image source={note} style={styles.image} />
        </View>
        {/* <View style={[styles.view, styles.tremolo]}>
          <Text style={styles.title}>Tremolo</Text>
        </View> */}
        <View style={styles.view}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Time", {
                init: true,
                type: this.state.type
              });
            }}
            style={[styles.view, styles.start]}
          >
            <Text style={{fontSize:36}}>START</Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  hamburger: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 10,
    color: "#fff"
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tremolo : {
    justifyContent: "flex-start",
  },
  start : {
    justifyContent: "flex-start",
  },
  image: {
    height: 150,
    width: 150
  },
  title: {
    fontSize: 60
  }
});

export default StartScreen;