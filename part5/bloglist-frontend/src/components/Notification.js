import PropTypes from 'prop-types'
const Notification = ({ message }) =>
  message && (
    <div className={message.type ? message.type : 'error'}>{message.text}</div>
  )

Notification.propTypes = {
  message: PropTypes.string.isRequired,
}
export default Notification
