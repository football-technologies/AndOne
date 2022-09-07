import { FtSmallButtonOutlined } from "./FtButton";
import { useSelector } from "react-redux";

import like, { createLike, deleteLike, fetchLikes } from "@/store/like";

import { useDispatch } from "react-redux";
import { ftToast, ftCreateId } from "@/plugins/mixin";

import { db } from "@/plugins/firebase";
import { doc, query, collectionGroup, where } from "firebase/firestore";
import useFtToast from "@/components/ui/FtToast";

import { useEffect } from "react";

import scheme from "@/helpers/scheme";
import _ from "lodash";

const LikeButton = ({ target, id, name }) => {
  const dispatch = useDispatch();
  const { ftToast } = useFtToast();
  const currentUser = useSelector((state) => state.account);
  const likes = useSelector((state) => state.like.likes);

  console.log(">>>>>>>>>>>>>>>>>> likes", likes);

  useEffect(() => {
    dispatch(
      fetchLikes({
        query: query(
          collectionGroup(db, `likes`),
          where("shop.id", "==", id),
          where("user.id", "==", currentUser.id)
        ),
      })
    );
  }, [dispatch]);

  const _createLike = () => {
    console.log(">>>>> clikc like button", target, id, currentUser.id);

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

    dispatch(createLike(editLike));

    likes = [
      {
        id: editLike.id,
      },
    ];

    ftToast("Likeを保存しました。");
  };

  const _deleteLike = () => {
    console.log(">>>>>>>>>> likes[0]", likes[0]);

    dispatch(
      deleteLike({
        id: likes[0].id,
        user: {
          id: currentUser.id,
        },
      })
    );

    likes = null;
    ftToast("Likeを取り消しました。");
  };

  return (
    <>
      {likes && likes.length > 0 ? (
        <FtSmallButtonOutlined onClick={() => _deleteLike()}>
          Delete Like
        </FtSmallButtonOutlined>
      ) : (
        <FtSmallButtonOutlined onClick={() => _createLike()}>
          Like
        </FtSmallButtonOutlined>
      )}
    </>
  );
};

export default LikeButton;
