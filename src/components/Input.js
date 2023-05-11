function Input({ handleChange }) {
  let timeout;

  const writing = (e) => {
    //wait for user stopped typing
    //and then call handleChange(e)
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleChange(e);
    }, 300);
  };
  return <input name="location" onChange={writing} type="search" />;
}

export default Input;
