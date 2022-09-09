import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "@chakra-ui/react";
import { Button, Text } from "@chakra-ui/react";

const FtDateTimePicker = forwardRef((props, ref) => {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button onClick={onClick} ref={ref}>
      <Text w="160px" fontWeight="400" align="left">
        {value}
      </Text>
    </Button>
  ));

  return (
    <>
      <DatePicker
        dateFormat="yyyy/MM/dd h:mm"
        timeIntervals={10}
        customInput={<ExampleCustomInput />}
        ref={ref}
        {...props}
      />
    </>
  );
});

export default FtDateTimePicker;
