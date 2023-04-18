import { useSelector } from 'react-redux'

const Notification = () => {
  //show notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  const message = useSelector((state) => state.notification)
  if (message === null || message === '') {
    return null
  }
  return <div style={style}>{message}</div>
}
export default Notification
