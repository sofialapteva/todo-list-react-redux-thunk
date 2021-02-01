import Loader from 'react-loader-spinner'

const Spinner = () => {
  return (<div className="w-28 mx-auto">
    <Loader
      type="Grid"
      color="orange"
      height={100}
      width={100}
      timeout={3000}
    />
  </div>);
}

export default Spinner;
