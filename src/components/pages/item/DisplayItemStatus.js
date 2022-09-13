import React from "react";
import dictionary from "@/helpers/dictionary";
import _ from "lodash";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { MdEdit, MdPublic, MdAlarmAdd, MdAlarmOff } from "react-icons/md";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const DisplayItemStatus = ({ item }) => {
  const [isShopOwner, setIsShopOwner] = useState(false);
  const currentUser = useSelector((state) => state.account);

  useEffect(() => {
    if (currentUser.shopId === item.shop.id) {
      setIsShopOwner(true);
    }
  }, [currentUser.id]);

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
        <Tag rounded="none" size="md" bgColor={row.color} color="red.200">
          <TagLeftIcon as={getIcon(row.icon)} />
          <TagLabel>{row.text}</TagLabel>
        </Tag>
      )}
    </>
  );
};

export default DisplayItemStatus;
