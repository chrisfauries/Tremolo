import React, { Fragment } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Picker,
  TextInput,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Header, Slider } from "react-native-elements";

class InputScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			segments: [],
			segment : {}
    };
  }
  static navigationOptions = {
    title: "Input"
  };

  componentDidUpdate(prevProps) {
    const { segment } = this.props.navigation.state.params;
    if (
			this.props.navigation.state.params !== prevProps.navigation.state.params
			) {
				segment.tempo = 100;
				segment.description = '';
			segment.goal = '';
      this.setState(
        state => {
          return { segment };
        },
        () => {}
      );
    }
  }

  componentDidMount() {
		const { segment } = this.props.navigation.state.params;
		segment.description = '';
		segment.goal = '';
		segment.tempo = 100;
    this.setState(
      state => {
        return { segment };
      },
      () => {}
    );
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setHidden(true);
    });
	}
	
	update(key, value) {
		this.setState(state => { return  {segment : {...state.segment, [key] : value } }});
	}

	saveSegment(cb) {
		this.setState(state => {
			return {
				segments : state.segments.concat(state.segment),
				segment : {}
		}}, cb)
	}

	handleNext() {
		this.saveSegment(() => {
			this.props.navigation.navigate("Time", {
				init: true,
				type: this.state.type
			});
		});
	}

	handleDone() {
		this.saveSegment(() => {
			this.props.navigation.navigate("Summary", { segments : this.state.segments });
		});
	}

  render() {
    const { segment } = this.state;
    const types = [
      "Fundamentals",
      "Warm-up",
      "Scales",
      "Technique",
      "Etude",
      "Music",
      "Other"
		];
		
		const goals =[
			"Notes/Rhythms",
			"Tempo",
			"Articulation",
			"Tuning",
			"Expression",
			"Phrasing",
			"Other"
		];

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
          centerComponent={{
            text: "Details",
            style: { color: "#fff", fontSize: 24 }
          }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <ScrollView>
          <View
            style={styles.section}
						>
						<Text style={styles.title}>Type</Text>
            <Picker
              selectedValue={segment.type}
              onValueChange={type => {
								this.update('type', type);
              }}
              style={{ height: 75, width: 300 }}
							>
              {types.map(choice => (
								<Picker.Item key={choice} label={choice} value={choice} />
								))}
            </Picker>
          </View>
          <View style={styles.section}>
						<Text style={styles.title}>What did you work on?</Text>
            <TextInput
							value={segment.description}
              style={{ height: 40, width: 300, borderColor: "gray", borderWidth: 2 }}
              onChangeText={description => {
                this.update('description', description);
              }}
							/>
          </View>
          <View style={styles.section}>
						<Text style={styles.title}>Tempo</Text>
            <Slider
              style={{ width: 300, height: 40 }}
              minimumValue={36}
              value={segment.tempo}
              onValueChange={tempo => {
                this.update('tempo', tempo);
              }}
              maximumValue={220}
							step={4}
							thumbTintColor='#6b52ae'
              minimumTrackTintColor="#aaa"
              maximumTrackTintColor="#000000"
            />
            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>{segment.tempo} BPM</Text>
          </View>
					<View
            style={styles.section}
						>
						<Text style={styles.title}>Goal</Text>
            <Picker
              selectedValue={segment.goal}
              onValueChange={goal => {
								this.update('goal', goal);
							}}
							style={{ height: 75, width: 300 }}
							>
								<Picker.Item key='default' label='--Select--' value='' />
              {goals.map(goal => (
								<Picker.Item key={goal} label={goal} value={goal} />
								))}
            </Picker>
          </View>
					<View style={styles.section}>
					<TouchableOpacity
                    style={styles.btn}
                    onPress={() => {this.handleNext() }}
                  >
                    <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
					</View>
					<View style={styles.section}>
					<TouchableOpacity
                    style={styles.btn}
                    onPress={() => {this.handleDone() }}
                  >
                  <Text style={[styles.btnText, styles.done]}>Done</Text>
          </TouchableOpacity>
					</View>
        </ScrollView>
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
	
	section : {
		flex: 1, 
		justifyContent: "center", 
		alignItems: "center",
		marginTop : 25 
	},

	title : {
		fontSize: 20,
		fontWeight : 'bold'
	},

	btn : {
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

	done : {
		backgroundColor : '#8B0000'
	}
});

export default InputScreen;
