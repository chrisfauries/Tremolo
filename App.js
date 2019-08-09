import React, {Fragment} from "react";
import {
  createAppContainer,
  createDrawerNavigator,
} from "react-navigation";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import StartScreen from "./components/StartScreen.js";
import InputScreen from "./components/InputScreen";
import TimeScreen from "./components/TimeScreen";
import SummaryScreen from "./components/SummaryScreen";
import SessionsScreen from "./components/SessionsScreen";
import StatsScreen from "./components/StatsScreen";
import SettingsScreen from "./components/SettingsScreen.js";

const customDrawers = props => {
  return (
    <ScrollView>
      <List {...props}></List>
    </ScrollView>
  );
};

const DrawerNavigator = createDrawerNavigator(
  {
    Start: StartScreen,
    Input: InputScreen,
    Time: TimeScreen,
    Summary: SummaryScreen,
    Sessions: SessionsScreen,
    Stats : StatsScreen,
    Settings : SettingsScreen
  },
  {
    hideStatusBar: true,
    drawerLockMode: "unlocked",
    drawerBackgroundColor: "rgba(255,255,255,.9)",
    overlayColor: "#6b52ae",
    contentComponent: customDrawers,
    drawerWidth: 150,
    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#6b52ae"
    }
  }
);


class List extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setHidden(true);
    });
  }

  closeAndPush(name) {
    this.props.navigation.navigate(name);
  }
  
  render() {
    const {activeItemKey} = this.props;
    return (
      <Fragment>
      <View>
        <TouchableOpacity onPress={this.props.navigation.closeDrawer}>
          <Text style={styles.hamburger}>&#9776;   MENU</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={()=> {this.closeAndPush('Start')}}>
          <Text style={[activeItemKey === 'Start' ? styles.selected : styles.item ]}>Start</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={()=> {this.closeAndPush('Sessions')}}>
          <Text style={[activeItemKey === 'Sessions' ? styles.selected : styles.item ]}>Sessions</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={()=> {this.closeAndPush('Stats')}}>
          <Text style={[activeItemKey === 'Stats' ? styles.selected : styles.item ]}>Stats</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={()=> {this.closeAndPush('Settings')}}>
          <Text style={[activeItemKey === 'Settings' ? styles.selected : styles.item ]}>Settings</Text>
        </TouchableOpacity>
      </View>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  hamburger: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 10,
    alignItems: 'center',
    color: "#000"
  },
  item: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: 'center',
    color: "#000"
  },
  selected: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: 'center',
    color: "#fff",
    backgroundColor : '#6b52ae'
  }
});

const App = createAppContainer(DrawerNavigator);
export default App;
