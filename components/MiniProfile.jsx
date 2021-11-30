import { signOut, useSession } from "next-auth/react";

const MiniProfile = () => {
  const { data:session } = useSession();

  return (
    <div className="ml-10 mt-8 flex justify-between items-center space-x-4">
      <img src={session?.user?.image} alt="raktim" className="h-12 w-12 rounded-full" />
      <div>
        <p className="text-lg">{session?.user?.username}</p>
        <p className="text-xs italic text-gray-500">Welcome to instagram</p>
      </div>
      <button onClick={signOut} className="text-blue-400">SignOut</button>
    </div>
  )
}

export default MiniProfile;
