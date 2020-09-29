import React, { Component } from "react";
import { DISHES } from "../shared/dishes";
import { Text, View, ScrollView, FlatList, Modal } from "react-native";
import { Card, Icon, Rating, Button, Input } from "react-native-elements";
import { COMMENTS } from "../shared/comments";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite ? console.log("Already favorite") : props.onPress()
            }
          />

          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.commentPress()}
          />
        </View>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: [],
      showModal: false,
      authorComment: "",
      commentText: "",
      rating: 0,
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  static navigationOptions = {
    title: "Dish Details",
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
  submitComment() {
    this.props.postComment(
      this.props.route.params.dishId,
      this.state.rating,
      this.state.authorComment,
      this.state.commentText
    );

    this.setState({ rating: 0, authorComment: "", commentText: "" });
    this.toggleModal();
  }

  render() {
    const dishId = this.props.route.params.dishId;

    return (
      <ScrollView>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={{ padding: 20 }}>
            <Rating
              showRating={true}
              startingValue={0}
              onFinishRating={(number) => {
                this.setState({ rating: number });
              }}
            />
            <Input
              onChangeText={(text) => {
                this.setState({ authorComment: text });
              }}
              value={this.state.authorComment}
              leftIcon={"avatar"}
              placeholder="Author"
            />

            <Input
              onChangeText={(text) => {
                this.setState({ commentText: text });
              }}
              value={this.state.commentText}
              leftIcon={"comment"}
              placeholder="Comment"
            />
            <Button
              buttonStyle={{ backgroundColor: "#512DA8" }}
              title="Submit"
              onPress={() => {
                this.submitComment();
              }}
            />
            <Button
              onPress={() => {
                this.toggleModal();
              }}
              buttonStyle={{ backgroundColor: "gray", marginTop: 20 }}
              title="cancel"
            />
          </View>
        </Modal>

        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          commentPress={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
