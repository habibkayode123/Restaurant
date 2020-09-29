import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { View } from "react-native";
import { DISHES } from "../shared/dishes";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Reservation from "./ReservationComponent";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Text,
} from "react-native";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import { Icon } from "react-native-elements";

import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const StackNavigator = createStackNavigator();
const DrawerNavigator = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);

const ReservationNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTitleStyle: {
          color: "#fff",
        },
        headerTintColor: "#fff",
      })}
    >
      <StackNavigator.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
        name={"Reservation"}
        component={Reservation}
      ></StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
};

const AboutNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <StackNavigator.Screen name="About" component={About} />
    </StackNavigator.Navigator>
  );
};

const ContachtNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <StackNavigator.Screen name="Contact" component={Contact} />
    </StackNavigator.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <StackNavigator.Screen name="Home" component={Home} />
    </StackNavigator.Navigator>
  );
};

const MenuNavigator = () => {
  return (
    <StackNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <StackNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <StackNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </StackNavigator.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
      drawerStyle={{ backgroundColor: "#D1C4E9" }}
    >
      <DrawerNavigator.Screen
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
        name="Home"
        component={MenuNavigator}
      />
      <DrawerNavigator.Screen
        options={{
          drawerLabel: "Menu",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="list" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
        name="Dishdetail"
        component={HomeNavigator}
      />
      <DrawerNavigator.Screen
        options={{
          drawerLabel: "About Us",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
        name="About"
        component={AboutNavigator}
      />
      <DrawerNavigator.Screen
        name="Contact"
        options={{
          title: "Contact Us",
          drawerLabel: "Contact Us",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={22}
              color={tintColor}
            />
          ),
        }}
        component={ContachtNavigator}
      />
      <DrawerNavigator.Screen
        name="Reservation"
        component={ReservationNavigator}
        options={{
          title: "Reservation",
          drawerLabel: "Reservation",
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={22}
              color={tintColor}
            />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  );
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,

          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
