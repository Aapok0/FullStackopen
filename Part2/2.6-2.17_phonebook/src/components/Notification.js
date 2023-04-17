/* A component, that renders a message that notifies of an action or an error in app.
    - the two input values are tied to message and messageType states
    - triggered by user action (add person, change number, remove person) or error during action
    - message style depends on message type (error or default = anything else)
    - when message is null nothing is rendered */
const Notification = ({message, messageType}) => {
  const notificationStyle = {
    width: 'fit-content',
    color: 'navy',
    background: 'lightblue',
    fontSize: 18,
    borderStyle: 'outset',
    borderRadius: 7,
    padding: 10,
    marginBottom: 30
  }
  const errorStyle = {
    width: 'fit-content',
    color: 'red',
    fontWeight: 'bold',
    background: '#dddddd',
    fontSize: 18,
    borderStyle: 'outset',
    borderRadius: 7,
    padding: 10,
    marginBottom: 30
  }

  if (message === null) {
    return null
  }

  if (messageType === 'error') {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
  else {
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
}

export default Notification