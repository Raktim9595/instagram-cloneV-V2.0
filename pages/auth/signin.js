import { getProviders, signIn } from "next-auth/react";
import { Header } from "../../components";
import Head from "next/head";

const signin = ({ providers }) => {
  return (
    <>
    <Head>
      <title>SignIn</title>
    </Head>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-40 px-14 text-center">
      <img src="https://links.papareact.com/ocw" className="w-80" alt="" />
      <p className="italic text-xs text-gray-500">
        this is not a real app, built for learning
      </p>
      <div className="mt-32">
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button className="p-3 bg-blue-400 hover:bg-blue-600 rounded-lg text-white hover:shadow-lg transition-all duration-300 ease-out" onClick={() => signIn(provider.id, { callbackUrl: "/" })} >
              SignIn with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  )
};

export default signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  }
};
