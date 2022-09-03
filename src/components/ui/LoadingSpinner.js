import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = ({ size, isLoading }) => {
  return (
    <>
      {isLoading && (
        <Spinner
          size={size}
          thickness="4px"
          speed="0.75s"
          emptyColor="lightGray"
          color="primary"
        />
      )}
    </>
  );
};

export default LoadingSpinner;
