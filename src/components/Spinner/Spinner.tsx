import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  "user-select": "none"
};

type SpinnerProp = {
  loading: boolean;
};

const Spinner = ({ loading }: SpinnerProp) => {
  return (
    <ClipLoader
      color="#23395d"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
