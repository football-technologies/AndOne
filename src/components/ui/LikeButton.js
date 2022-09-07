import { FtSmallButtonOutlined } from "./FtButton";
import { useSelector } from "react-redux";
import { createLike, deleteLike, fetchLikes } from "@/store/like";
import { useDispatch } from "react-redux";
import { ftCreateId } from "@/plugins/mixin";
import { db } from "@/plugins/firebase";
import { doc, query, collectionGroup, where } from "firebase/firestore";
import useFtToast from "@/components/ui/FtToast";
import { useEffect } from "react";
import scheme from "@/helpers/scheme";
import _ from "lodash";
import { Button, Icon } from "@chakra-ui/react";
import { MdCheck } from "react-icons/md";

const LikeButton = ({ target, id, name }) => {
  const dispatch = useDispatch();
  const { ftToast } = useFtToast();
  const currentUser = useSelector((state) => state.account);
  const likes = useSelector((state) => state.like.likes);

  useEffect(() => {
    _fetchLikes();
  }, [dispatch]);

  const _fetchLikes = () => {
    if (target === "shop") {
      dispatch(
        fetchLikes({
          query: query(
            collectionGroup(db, `likes`),
            where("shop.id", "==", id),
            where("user.id", "==", currentUser.id)
          ),
        })
      );
    }
  };

  const _createLike = async () => {
    const editLike = _.cloneDeep(scheme.likes);
    editLike.id = ftCreateId("like");
    if (target === "shop") {
      editLike.target = 1;
      editLike.shop.id = id;
      editLike.shop.name = name;
      editLike.shop.ref = doc(db, `shops/${id}`);
    } else {
      editLike.target = 2;
      editLike.item.id = id;
      editLike.item.name = name;
      editLike.item.ref = doc(db, `items/${id}`);
    }

    editLike.user.id = currentUser.id;
    editLike.user.name = currentUser.name;
    editLike.user.ref = doc(db, `users/${currentUser.id}`);

    await dispatch(createLike(editLike));

    ftToast("Likeを保存しました。");

    // TODO: store/likesのonSnapshotにしていないので、更新の旅にdispatchを呼び出している
    _fetchLikes();
  };

  const _deleteLike = async () => {
    await dispatch(
      deleteLike({
        id: likes[0].id,
        user: {
          id: currentUser.id,
        },
      })
    );

    ftToast("Likeを取り消しました。");

    // TODO: store/likesのonSnapshotにしていないので、更新の旅にdispatchを呼び出している
    _fetchLikes();
  };

  return (
    <>
      {likes && likes.length > 0 ? (
        <Button
          rounded="full"
          fontSize="10px"
          size="xs"
          borderWidth="1px"
          borderColor="lightGray"
          px={2}
          py={0}
          onClick={() => _deleteLike()}
        >
          <Icon as={MdCheck} color="paleGray" mr="1"></Icon>
          Like
        </Button>
      ) : (
        <FtSmallButtonOutlined onClick={() => _createLike()}>
          + Like
        </FtSmallButtonOutlined>
      )}
    </>
  );
};

export default LikeButton;
