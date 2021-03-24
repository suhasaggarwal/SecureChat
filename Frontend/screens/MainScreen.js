import React, { Component } from "react";
import { Container } from "native-base";
import * as colors from "../constants/colors";
import { StatusBar, Animated, View } from "react-native";
import {
  ToggleSwitchStyle,
  ActionButtonStyle,
  LightTheme,
  DarkTheme,
} from "../appStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToggleSwitch from "../components/ToggleSwitch";
import { connect } from "react-redux";
import { JoinRooms } from "../store/reducers/Socket";
import { updateMode } from "../store/actions/LoginActions";
import { bindActionCreators } from "redux";
import {
  addMessage,
  updatelastMessageReadIndex,
  fillData,
  addRoom,
  updateRoom,
  removeRoom,
  updateRoomProfile,
} from "../store/actions/RoomActions";
import { socket } from "../store/reducers/Socket";
import ChatListScreen from "./ChatList";
import moment from "moment";
import ActionButton from "../components/FloatBar";
import DarkActionButton from "../components/FloatBarDark";

function sorted(arr) {
  const sortedArray = arr.sort(function (a, b) {
    return moment(b.lastTime).unix() - moment(a.lastTime).unix();
  });
  return sortedArray;
}

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class MainApp extends Component {
  constructor(props) {
    super(props);
    var defaultActiveIndex;
    if (this.props.user.mode === "light") defaultActiveIndex = 0;
    else defaultActiveIndex = 1;

    this.state = {
      defaultActiveIndex: defaultActiveIndex,
      theme: this.props.user.mode,
      rooms: sorted(this.props.rooms),
      activeRoom: null,
    };

    this.SwitchThemeFunction(this.state.theme);
    JoinRooms(this.props.user.token);
  }

  updateComponent = async () => {
    if (this.state.activeRoom)
      this.props.updatelastMessageReadIndex(this.state.activeRoom);
    this.setState({
      rooms: sorted(this.props.rooms),
    });
  };

  UpdateActiveRoom = (id) => {
    this.setState({
      activeRoom: id,
      rooms: sorted(this.props.rooms),
    });
  };

  filterRooms = (mode) => {
    if (mode === "dark") {
      const darkRooms = this.state.rooms.filter((room) => room.dark);
      return darkRooms;
    } else {
      const lightRooms = this.state.rooms.filter((room) => !room.dark);
      return lightRooms;
    }
  };

  componentDidMount = () => {
    socket.on("recieveMessage", (message, roomId) => {
      this.props.addMessage(roomId, message);
      this.updateComponent();
    });
    socket.on("addRoom", async (room) => {
      await this.props.addRoom(room);
      this.updateComponent();
    });
    socket.on("updateRoom", async (roomId, members) => {
      await this.props.updateRoom(roomId, members);
      this.updateComponent();
    });
    socket.on("removeRoom", async (roomId) => {
      await this.props.removeRoom(roomId);
      this.updateComponent();
    });
    socket.on("update_profile", async (roomId, url) => {
      await this.props.updateRoomProfile(roomId, url);
      this.updateComponent();
    });
    setTimeout(() => {
      StatusBar.setHidden(false);
    });
  };

  SwitchToLight() {
    setTimeout(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor(colors.white);
    });
  }

  SwitchToDark() {
    setTimeout(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor(colors.black);
    });
  }

  SwitchThemeFunction(currentTheme) {
    this.props.updateMode(currentTheme);
    this.setState({
      theme: currentTheme,
    });
    if (currentTheme == "light") {
      this.SwitchToLight();
    } else if (currentTheme == "dark") {
      this.SwitchToDark();
    }
  }

  render() {
    var screen_div;
    var float_div;
    if (this.state.theme === "light") {
      screen_div = (
        <ChatListScreen
          rooms={this.filterRooms("light")}
          activeRoom={this.state.activeRoom}
          appStyles={LightTheme}
          UpdateActiveRoom={this.UpdateActiveRoom.bind(this)}
          updateComponent={this.updateComponent.bind(this)}
          updatelastMessageReadIndex={this.props.updatelastMessageReadIndex}
          navigation={this.props.navigation}
        />
      );
      float_div = <ActionButton navigation={this.props.navigation} />;
    } else if (this.state.theme === "dark") {
      screen_div = (
        <ChatListScreen
          rooms={this.filterRooms("dark")}
          activeRoom={this.state.activeRoom}
          appStyles={DarkTheme}
          UpdateActiveRoom={this.UpdateActiveRoom.bind(this)}
          updateComponent={this.updateComponent.bind(this)}
          updatelastMessageReadIndex={this.props.updatelastMessageReadIndex}
          navigation={this.props.navigation}
        />
      );
      float_div = <DarkActionButton navigation={this.props.navigation} />;
    }
    return (
      <Container>
        {screen_div}
        <View style={ToggleSwitchStyle.Toggle}>
          <ToggleSwitch
            onLeftState={() => this.SwitchThemeFunction("light")}
            onRightState={() => this.SwitchThemeFunction("dark")}
            AnimatedIcon={AnimatedIcon}
            defaultActiveIndex={this.state.defaultActiveIndex}
          />
        </View>
        <View style={ActionButtonStyle.Toggle}>{float_div}</View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.room.rooms,
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addMessage,
      updatelastMessageReadIndex,
      fillData,
      addRoom,
      updateRoom,
      removeRoom,
      updateRoomProfile,
      updateMode,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
