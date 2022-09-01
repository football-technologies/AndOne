import { Avatar } from "@chakra-ui/react";

const UserIcon = ({ size, name, url }) => {
  return <Avatar name={name} src={url} size={size} />;
};

export default UserIcon;
