const ErrorMessage= ({ message }) => {
  if(message===null|| message===''){
    return null
  }
  return(
    <div className='error'>{message}</div>
  )
}
export default ErrorMessage
