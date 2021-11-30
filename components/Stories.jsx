import {data} from "../data";
import { useSession } from "next-auth/react";

const Stories = () => {
  const { data:session } = useSession();

  const Story = ({ photoURL, username }) => {
    return (
      <div>
        <img className="h-14 w-14 rounded-full p-[1.5px] cursor-pointer object-contain border-red-500 border-2 hover:scale-110 transition-transform duration-200 ease-out" src={photoURL} alt={username} />
        <p className="w-14 text-xs truncate">{username}</p>
      </div>
    )
  }
  
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500">
      {session && (
        <Story key={session?.user?.uid} photoURL={session?.user?.image} username={session?.user?.username} />
      )}
      {data.map(({ id, firstName, lastName, picture }) => (
        <Story key={id} username={`${firstName}_${lastName}`} photoURL={picture} />
      ))}
    </div>
  )
}

export default Stories;
