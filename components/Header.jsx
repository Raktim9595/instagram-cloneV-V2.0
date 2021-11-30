import Image from "next/image";
import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, CameraIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  const handleLogoClick = () => router.push("/");

  return (
    <>
      <div className="shadow-sm sticky top-0 z-50 border-b-1 bg-white">
        <div className="flex h-12 md:h-auto justify-between items-center max-w-6xl mx-5 lg:mx-10 xl:mx-auto">
          {/* LEFT LOGO  */}
          <CameraIcon className="h-7 md:hidden font-extralight sm:h-10" />
          <div onClick={handleLogoClick} className="relative h-8 w-24 cursor-pointer">
            <Image priority={true} src="https://links.papareact.com/ocw" layout="fill" objectFit="contain" />
          </div>
          {/* <div onClick={handleLogoClick} className="relative h-7 w-7 sm:h-10 sm:w-10 lg:hidden flex-shrink-0">
            <Image priority={true} src="https://links.papareact.com/jjm" layout="fill" objectFit="contain" />
          </div> */}

          {/* middle search box  */}
          <div className="mt-1 hidden md:block relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
            </div>
            <input type="text" placeholder="search" className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black" />
          </div>

          <div className="flex space-x-2 md:hidden items-center">
            <PaperAirplaneIcon className="feed-btns rotate-45" />
            {!session && <button onClick={signIn} className="font-semibold">SignIn</button>}
          </div>
          

          {/* right icons  */}
          <div className="hidden md:flex items-center justify-end space-x-4">
            <HomeIcon onClick={() => router.push("/")} className="header__icons-right" />
            {session ? (
              <>
              <div className="header__icons-right relative">
                <div className="absolute -top-2 -right-1 h-5 w-5 text-white rounded-full bg-red-500 flex items-center justify-center z-10 animate-pulse">3</div>
                <PaperAirplaneIcon className="header__icons-right rotate-45" />
              </div>
              <PlusCircleIcon onClick={() => setOpen(true)} className="header__icons-right" />
              <UserGroupIcon className="header__icons-right" />
              <HeartIcon className="header__icons-right" />
              <div onClick={signOut} className="rounded-full h-10 w-10 flex items-center justify-center">
                <img src={session?.user?.image} alt={session?.user?.name} className="h-10 rounded-full cursor-pointer" />
              </div>
              </>
            ) : (
              <button onClick={signIn}>
                <span>SignIn</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {session && (  
        <div className="fixed md:hidden border-t shadow-md w-full flex items-center px-4 sm:px-6 justify-between left-0 bottom-0 h-10 z-50 bg-white">
          <HomeIcon className="feed-btns" />
          <SearchIcon className="feed-btns" />
          <PlusCircleIcon onClick={() => setOpen(true)} className="feed-btns" />
          <HeartIcon className="feed-btns" />
          <div onClick={signOut} className="rounded-full h-10 w-10 flex items-center justify-center">
            <img src={session?.user?.image} alt={session?.user?.name} className="h-7 w-7 rounded-full cursor-pointer" />
          </div>
        </div>
      )}
    </>
  )
}

export default Header;
