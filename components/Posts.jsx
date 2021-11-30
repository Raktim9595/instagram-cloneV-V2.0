import Post from "./Post";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), async snapShot => {
      setPosts(snapShot.docs);
    })
  }, [db]);

  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} id={post.id} username={post.data().username} imageUrl={post.data().image} img={post.data().profileImg} caption={post.data().caption} timestamp={post.data()?.timestamp} />
      ))}
    </div>
  )
}

export default Posts;
