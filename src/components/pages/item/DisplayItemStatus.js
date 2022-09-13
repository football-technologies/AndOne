import dictionary from "@/helpers/dictionary";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MdEdit, MdPublic, MdAlarmAdd, MdAlarmOff } from "react-icons/md";
import { useSelector } from "react-redux";

const DisplayItemStatus = ({ item }) => {
  const [isShopOwner, setIsShopOwner] = useState(false);
  const currentUser = useSelector((state) => state.account);

  useEffect(() => {
    if (currentUser.shopId === item.shop.id) {
      setIsShopOwner(true);
    }
  }, [item.id]);

  const row = _.find(dictionary.itemStatus, (row) => {
    if (row.id === item.itemStatus) {
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
      {isShopOwner && (
        <Tag rounded="none" size="md" colorScheme={row.color}>
          <TagLeftIcon as={getIcon(row.icon)} />
          <TagLabel>{row.text}</TagLabel>
        </Tag>
      )}
    </>
  );
};

export default DisplayItemStatus;
