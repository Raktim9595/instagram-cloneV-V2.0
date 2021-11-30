import { data } from "../data";
import { useEffect, useState } from "react";

const Suggestions = () => {
  const fakeSuggestions = data.splice(0,5);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(fakeSuggestions);
  }, []);

  const FakeProfile = ({ img, username }) => (
    <div className="flex items-center space-x-2 mb-2">
      <img className="h-10 w-10 rounded-full object-cover" src={img} alt={username} />
      <p className="flex-1">{username}</p>
      <button className="text-blue-400">Follow</button>
    </div>
  )

  return (
    <div className="ml-10 mt-4">
      <div className="flex justify-between text-sm mb-5 items-center">
        <h3 className="text-gray-400">suggestions for you</h3>
        <button className="capitalize text-gray-600 font-semibold">see all</button>
      </div>
      {users.map(({ id, firstName, lastName, picture }) => (
        <FakeProfile key={id} username={`${firstName}_${lastName}`} img={picture} />
      ))}
    </div>
  )
}

export default Suggestions;