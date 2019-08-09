import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
	StatusBar,
	SectionList
} from "react-native";
import { Header, ListItem } from "react-native-elements";
import axios from "axios";

class SummaryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			session: null
		}
	}

	componentDidUpdate(prevProps) {
		let session;
    if (
			this.props.navigation.state.params !== prevProps.navigation.state.params
			) {
				if(this.props.navigation.state.params.structured) {
					session = this.props.navigation.state.params.session;
				} else {
					const { segments } = this.props.navigation.state.params;
					session  = this.structureData(segments);
				}
      this.setState({ session });
    }
  }

	componentDidMount() {
		let session;
		if(this.props.navigation.state.params.structured) {
			session = this.props.navigation.state.params.session;
		} else {
			const { segments } = this.props.navigation.state.params;
			session  = this.structureData(segments);
		}
		this.setState({ session });
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setHidden(true);
    });
	}

	structureData(segments) {
		segments = segments.map(segment => {
			delete segment.init;
			delete segment.paused;
			delete segment.stoptimer;
			return segment;
		})

		let groupedByType = segments.reduce((sorted, segment) => {
			if(sorted[segment.type] === undefined) {
				sorted[segment.type] = [];
			}
			sorted[segment.type].push(segment);
			return sorted;
		}, {});

		let structuredForSectionList = [];
		for(type in groupedByType) {
			let obj = {title: type, data: groupedByType[type]};
			structuredForSectionList.push(obj);
		}

		return structuredForSectionList
	}

	countReps(reps, flag) {
		let count = 0;
		if(flag === undefined) {
			return reps.length;
		}
		reps.forEach(rep => {
			if(rep === flag) {
				count++;
			}
		})
		return count;
	}

	saveSession() {
		axios.post('http://127.0.0.1:3001/api/practice/',this.state.session).then(console.log).catch(console.log)
		this.props.navigation.navigate("Start", {});
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
						text: "Summary",
						style: { color: "#fff", fontSize: 18 }
					}}
					rightComponent={{ icon: "home", color: "#fff" }}
				/>
				<View style={styles.view}>
					{this.props.navigation.state.params.structured ? (
						<View />
					) : (
						<View style={{justifyContent: 'center',
						alignItems: 'center', marginTop: 10,marginBottom: 10}}>
	
					<TouchableOpacity
							onPress={() => {
								this.saveSession();
							 }}
							style={styles.btn}
						>
							<Text style={styles.btnText}>Finish and Store</Text>
						</TouchableOpacity>
						</View>
					)}

					{!this.state.session ? (
						<View></View>
					) : (
						<SectionList
						sections={this.state.session}
						renderItem={({item}) => {
							return (
								<View>
									<ListItem key={item.description} title={'Title'} bottomDivider={true}	titleStyle={{fontWeight: 'bold', fontStyle: 'italic', fontSize: 18}} rightElement={<Text>{item.description}</Text>}/>
									<ListItem key={item.description} title={'Tempo'}  leftIcon={{name: 'wifi'}} bottomDivider={true}	titleStyle={{fontStyle: 'italic'}} rightElement={<Text>{item.tempo} BPM</Text>}/>
									<ListItem key={item.description} title={'Total Time'}  leftIcon={{name: 'timer'}} bottomDivider={true}	titleStyle={{fontStyle: 'italic'}} rightElement={<Text>{item.time}</Text>}/>
									<ListItem key={item.description} title={'Goal'}  leftIcon={{name: 'feedback'}} bottomDivider={true}	titleStyle={{fontStyle: 'italic'}} rightElement={<Text>{item.goal}</Text>}/>
									<ListItem key={item.description} title={'Correct Reps'}  leftIcon={{name: 'done'}} bottomDivider={true}	titleStyle={{fontStyle: 'italic'}} rightElement={<Text>{this.countReps(item.repStatus, 1)}</Text>}/>
									<ListItem key={item.description} title={'Incorrect Reps'}  leftIcon={{name: 'block'}} bottomDivider={true}	titleStyle={{fontStyle: 'italic'}} rightElement={<Text>{this.countReps(item.repStatus, -1)}</Text>}/>
									<ListItem key={item.description} title={'Total Reps'}  leftIcon={{name: 'add'}} bottomDivider={true}	titleStyle={{fontStyle: 'italic'}} rightElement={<Text>{this.countReps(item.repStatus)}</Text>}/>
								</View>
							)	
					}}
						renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
						keyExtractor={(item, index) => index}
					/>
					)}

				</View>
			</View>
		);
	}
};


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
    backgroundColor: "green",
    color: "white"
  },

  btnText: {
		color: "white",
    fontSize: 28,
    textAlign: "center",
    lineHeight: 50
  },

	view: {
    flex: 1,
	},
	
	sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

})
export default SummaryScreen;



