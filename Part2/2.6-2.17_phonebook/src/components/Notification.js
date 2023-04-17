const Notification = ({message}) => {
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

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification