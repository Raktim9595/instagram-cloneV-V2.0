import { Stories, Posts, MiniProfile, Suggestions } from "./";
import { useSession } from "next-auth/react";

const Feed = () => {
  const { data:session } = useSession();

  return (
    <main className={`${session && "grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto"} ${!session && "max-w-3xl mx-auto"}`}>
      <section className="col-span-full md:col-span-2">
        {/* stories */}
        <Stories />

        {/* feed  */}
        <Posts />
      </section>

      {session && (
        <section className="hidden xl:inline-grid xl:col-span-1">
        <div className="fixed top-20">
          {/* mini profile */}
          <MiniProfile />

          {/* suggestions */}
          <Suggestions />
        </div>
        </section>
      )}
    </main>
  )
}

export default Feed;
