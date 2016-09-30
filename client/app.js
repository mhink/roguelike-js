import React from "react";
import { connect } from "react-redux";

const App = ({sayHello}) =>
  <main className="appMain">
    <h1>Hello, world!</h1>
    <button className="btn" onClick={sayHello}>Say Hello</button>
  </main>;

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  sayHello: () => dispatch({ type: "SAY_HELLO" }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
