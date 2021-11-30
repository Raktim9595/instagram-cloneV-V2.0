import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "@firebase/firestore";
import { PaperAirplaneIcon, HeartIcon, BookmarkIcon, ChatIcon, EmojiHappyIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";

import { db } from "../firebase";

const Post = ({ id, username, img, caption, imageUrl, timestamp }) => {
  const {data:session} = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    return onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")),async snapshot => {
      setComments(snapshot.docs);
    })
  }, [db, id]);

  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), async snapshot => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => (
    setHasLiked(
      likes.findIndex(like => like.id === session?.user?.uid) !== -1
    )
  ), [likes]);
  
  const likePost = async () => {
    if(hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        user: session?.user?.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  }

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header  */}
      <div className="flex items-center px-3 pt-2 sm:px-5 sm:pt-5 mb-3">
        <img src={img} alt={username} className="h-12 w-12 cursor-pointer rounded-full object-contain border p-1 mr-3" />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>
      <hr />

      {/* image  */}
      <img onDoubleClick={likePost} src={imageUrl} alt={username} className="object-contain w-full" />

      {/* buttons */}
      {session && (
        <div className="px-4 pt-4 flex items-center justify-between">
          <div className="flex space-x-4 items-center">
            {hasLiked ? (
              <HeartIconFilled onClick={likePost} className="feed-btns text-red-500 hover:!text-red-600" />
            ) : (
              <HeartIcon className="feed-btns" onClick={likePost} />
            )}
            <ChatIcon className="feed-btns" />
            <PaperAirplaneIcon className="feed-btns rotate-45" />
          </div>
          <BookmarkIcon className="feed-btns" />
        </div>
      )}

      {likes.length>0 && (
        <p className="ml-6 text-gray-500 capitalize">{likes.length} likes</p>
      )}

      {/* captions  */}
      <p className="p-5 truncate">
        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </p>

      {/* comments  */}
      {comments.length > 0 && (
        <div className="ml-8 flex flex-col space-y-3 mb-4 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {comments.map(comment => (
            <div className="flex pr-8 space-x-3 items-center" key={comment.id}>
              <img className="h-8 flex-shrink-0 w-8 rounded-full" src={comment.data().userImage} alt="user" />
              <p className="flex-1">{comment.data().comment}</p>
              <Moment fromNow className="text-xs italic text-gray-400">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      <div className="ml-4 uppercase text-base text-gray-400 italic">
        {moment(timestamp?.toDate()).fromNow()}
      </div>

      {/* inputbox */}
      <hr className="mb-2" />
      {session && (
        <form onSubmit={sendComment} className="flex space-x-3 px-3 items-center mb-3">
          <EmojiHappyIcon className="h-7 flex-shrink-0 cursor-pointer" />
          <input value={comment} onChange={e => setComment(e.target.value)} className="flex-1 focus:ring-0 outline-none border-none rounded-md px-3" type="text" placeholder="comment..." />
          <button disabled={!comment.trim()} type="submit" className="flex-shrink-0 font-semibold text-blue-500 disabled:text-blue-300 disabled:cursor-not-allowed">Post</button>
        </form>
      )}

    </div>
  )
}

export default Post;