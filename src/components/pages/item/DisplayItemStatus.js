import React from "react";
import dictionary from "@/helpers/dictionary";
import _ from "lodash";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

import { MdEdit } from "react-icons/md";

const DisplayItemStatus = ({ itemStatus = 1 }) => {
  const row = _.find(dictionary.itemStatus, (row) => {
    if (row.id === itemStatus) {
      return row;
    }
  });

  return (
    <>
      <Tag rounded="none" size="md" bgColor={row.color} color="red.200">
        <TagLeftIcon as={MdEdit} />
        <TagLabel>{row.text}</TagLabel>
      </Tag>
    </>
  );
};

export default DisplayItemStatus;
