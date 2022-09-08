import React from "react";
import dictionary from "@/helpers/dictionary";
import _ from "lodash";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { MdEdit, MdPublic, MdAlarmAdd, MdAlarmOff } from "react-icons/md";

const DisplayItemStatus = ({ itemStatus = 1 }) => {
  const row = _.find(dictionary.itemStatus, (row) => {
    if (row.id === itemStatus) {
      return row;
    }
  });

  const getIcon = (icon) => {
    switch (icon) {
      case "MdEdit":
        return MdEdit;
      case "MdPublic":
        return MdPublic;
      case "MdAlarmAdd":
        return MdAlarmAdd;
      case "MdAlarmOff":
        return MdAlarmOff;
    }
  };

  return (
    <>
      <Tag rounded="none" size="md" bgColor={row.color} color="red.200">
        <TagLeftIcon as={getIcon(row.icon)} />
        <TagLabel>{row.text}</TagLabel>
      </Tag>
    </>
  );
};

export default DisplayItemStatus;
