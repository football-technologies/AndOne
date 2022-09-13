import { db } from "@/plugins/firebase";
import { fetchTags } from "@/store/tag";
import { Button } from "@chakra-ui/react";
import { query, collection } from "firebase/firestore";
import NextLink from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const TagIndex = () => {
  const bindTags = useSelector((state) => state.tag.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchTags({
        query: query(collection(db, `tags`)),
        isOnSnapshot: true,
        type: "fetch",
      })
    );
  }, [dispatch]);

  return (
    <>
      {bindTags &&
        bindTags.map((tag) => {
          return (
            <Button variant="outline" key={tag.id}>
              <NextLink href={`/tags/${tag.id}`} passHref>
                <a>
                  {tag.id}:{tag.name}
                </a>
              </NextLink>
            </Button>
          );
        })}
    </>
  );
};

export default TagIndex;
