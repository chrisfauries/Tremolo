import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import moment from "moment";
import { Header, Icon } from "react-native-elements";

class TimeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      init: null,
      paused: false,
      time: "0:00",
      repTime: [],
      repStatus: []
    };
  }
  static navigationOptions = {
    title: "Time"
  };

  componentDidUpdate(prevProps) {
    const { type, init } = this.props.navigation.state.params;
    if (
      this.props.navigation.state.params !== prevProps.navigation.state.params
    ) {
      this.setState({ type, init }, () => {
        this.startTimer();
      });
    }
  }
  componentDidMount() {
    const { type, init } = this.props.navigation.state.params;
    this.setState({ type, init }, () => {
      this.startTimer();
    });

    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setHidden(true);
    });
  }

  startTimer() {
    if (this.state.stopTimer) {
      clearInterval(this.state.stopTimer);
    }
    if (this.state.paused) {
      this.setState(state => {
        return { paused: false, time: "0:00" };
      });
    }
		const start = moment().startOf("day");
		const perciseStart = Date.now();
    const current = moment().startOf("day");
    const stopTimer = setInterval(() => {
      if (!this.state.paused) {
        current.add(1, "second");
				const difference = moment(current).diff(start) / 1000;
        if (difference < 600) {
          this.setState({
            time: current.format("m:ss"),
						secondsElapsed: difference,
						perciseDuration : Date.now() - perciseStart
          });
        } else {
          this.setState({
            time: current.format("mm:ss"),
						secondsElapsed: difference,
						perciseDuration : Date.now() - perciseStart
          });
        }
      }
    }, 1000);
    this.setState({ stopTimer: stopTimer });
  }

  pause() {
    this.setState(state => {
      return { paused: !state.paused };
    });
  }

  trackRep(type) {
    this.setState(state => {
      return {
        repTime: [...state.repTime, state.secondsElapsed],
        repStatus: [...state.repStatus, type]
      };
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
            text: 'Practice segment',
            style: { color: "#fff", fontSize: 18 }
          }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <View style={[styles.view, { justifyContent: "flex-end" }]}>
          <Text style={{ fontSize: 24 }}>How was your last rep?</Text>
          <View style={styles.rep}>
            <TouchableOpacity
              onPress={() => {
                this.trackRep(-1);
              }}
              style={{ justifyContent: "center", padding: 30 }}
            >
              <Icon name="thumb-down" type="Entypo" size={60} color="#800000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.trackRep(1);
              }}
              style={{ justifyContent: "center", padding: 30 }}
            >
              <Icon name="thumb-up" type="Entypo" size={60} color="#556B2F" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.view, { width: "100%" }]}>
          <TouchableOpacity
            onPress={() => {
              this.pause();
            }}
            style={{ width: "100%", textAlign: "center" }}
          >
            <Text
              style={[
                styles.timer,
                { textAlign: "center" },
                this.state.paused ? styles.red : styles.green
              ]}
            >
              {this.state.time}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.view]}>
          <TouchableOpacity
            style={[styles.btn, this.state.paused ? {} : styles.hide]}
            onPress={() => {
              this.props.navigation.navigate("Input", {
                segment: this.state
              });
            }}
          >
            <Text
              style={[styles.btnText, this.state.paused ? {} : styles.hide]}
            >
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  hamburger: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 10,
    color: "#fff"
  },
  timer: {
    fontSize: 100
  },
  green: {
    color: "green"
  },
  red: {
    color: "red"
  },
  rep: {
    justifyContent: "center",
    flexDirection: "row"
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
  hide: {
    height: 0
  }
});

export default TimeScreen;
