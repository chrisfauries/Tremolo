import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Header, ListItem } from "react-native-elements";
import axios from "axios";

class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: null
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.navigation.state.params !== prevProps.navigation.state.params
    ) {
      axios
        .get("http://127.0.0.1:3001/")
        .then(data => this.setState({ sessions: data.data }))
        .catch(console.log);
    }
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:3001/")
      .then(data => this.setState({ sessions: data.data }))
      .catch(console.log);
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setHidden(true);
    });
  }

  render() {
    return (
      <View style={styles.view}>
        <Header
          containerStyle={{ height: 50, paddingTop: 0 }}
          backgroundColor="#6b52ae"
          leftComponent={
            <TouchableOpacity onPress={this.props.navigation.openDrawer}>
              <Text style={styles.hamburger}>&#9776;</Text>
            </TouchableOpacity>
          }
          centerComponent={{
            text: "Stats",
            style: { color: "#fff" }
          }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <View style={styles.view}>
					<Text>This is where the stats will go.</Text>
        </View>
      </View>
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
    flex: 1
  }
});

export default StatsScreen;
