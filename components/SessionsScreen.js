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

class SessionsScreen extends React.Component {
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

  handleSelection(session) {
    this.props.navigation.navigate("Summary", { session, structured: true });
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
            text: "Sessions",
            style: { color: "#fff" }
          }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <View style={styles.view}>
				<ListItem
										title={"Date"}
										titleStyle={{fontSize:18, fontWeight: 'bold'}}
										rightTitleStyle={{fontSize:18, fontWeight: 'bold'}}
										rightTitle={"Segments"}
                    bottomDivider={true}
                  />
          {!this.state.sessions ? (
            <View />
          ) : (
						
            this.state.sessions.map((session, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.handleSelection(session.session);
                  }}
                >
                  <ListItem
										title={session.date}
										chevron={true}
                    badge={{ value: session.session.length, status: "success" }}
                    bottomDivider={true}
                  />
                </TouchableOpacity>
              );
            })
          )}
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

  btn: {
    width: 300,
    height: 50,
    backgroundColor: "#6b52ae",
    color: "white"
  },

  btnText: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    lineHeight: 50
  },

  view: {
    flex: 1
  },

  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

export default SessionsScreen;
