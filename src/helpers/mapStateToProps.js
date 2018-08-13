export const mapStateToProps = (state, ownProps) => {
  console.log("sttae", state)
  console.log("own props", ownProps);
  return {
    global: state,
  }
}
