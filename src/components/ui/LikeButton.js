import { FtSmallButtonOutlined } from "./FtButton";
import useFtToast from "@/components/ui/FtToast";
import scheme from "@/helpers/scheme";
import { db } from "@/plugins/firebase";
import { ftCreateId } from "@/plugins/mixin";
import { createLike, deleteLike, fetchLikes } from "@/store/like";
import { Button, Icon } from "@chakra-ui/react";
import { doc, query, collectionGroup, where } from "firebase/firestore";
import _ from "lodash";
import { useEffect } from "react";
import { MdCheck } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

const LikeButton = ({ target, id, name }) => {
  const dispatch = useDispatch();
  const { ftToast } = useFtToast();
  const currentUser = useSelector((state) => state.account);
  const likes = useSelector((state) => state.like.likes);

  const text = {
    shop: {
      button: {
        create: "+ Like",
        delete: "Like",
      },
      toast: {
        create: "Likeに保存しました",
        delete: "Likeを取り消しました",
      },
    },
    item: {
      button: {
        create: "+ Watch",
        delete: "Watch",
      },
      toast: {
        create: "Watchに保存しました",
        delete: "Watchを取り消しました",
      },
    },
  };

  useEffect(() => {
    _fetchLikes();
  }, [dispatch, id]);

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
    } else {
      dispatch(
        fetchLikes({
          query: query(
            collectionGroup(db, `likes`),
            where("item.id", "==", id),
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
    } else if (target === "item") {
      editLike.target = 2;
      editLike.item.id = id;
      editLike.item.name = name;
      editLike.item.ref = doc(db, `items/${id}`);
    }

    editLike.user.id = currentUser.id;
    editLike.user.name = currentUser.name;
    editLike.user.ref = doc(db, `users/${currentUser.id}`);
    editLike.user.icon = currentUser.icon;

    await dispatch(createLike(editLike));

    ftToast(text[target].toast.create);

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

    ftToast(text[target].toast.delete);

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
          mt="2"
          onClick={() => _deleteLike()}
        >
          <Icon as={MdCheck} color="paleGray" mr="1"></Icon>
          {text[target].button.delete}
        </Button>
      ) : (
        <FtSmallButtonOutlined mt="2" onClick={() => _createLike()}>
          {text[target].button.create}
        </FtSmallButtonOutlined>
      )}
    </>
  );
};

export default LikeButton;
