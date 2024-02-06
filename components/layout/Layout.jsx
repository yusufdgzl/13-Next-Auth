import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Layout(props) {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div>
      <div className={`flex w-full justify-around ${session ? 'bg-green-800' : 'bg-[#13113a]'} h-20 font-semibold text-gray-400 font-serif px-10 items-center text-2xl`}>
        <Link className="hover:text-white" href="/">
          Home
        </Link>
        <div className="flex py-2 px-10 w-auto space-x-8 justify-around bg-[#1b2129] rounded-md">
          {session && (
            <Link className="hover:text-white" href="/favorites">
              Favorite
            </Link>
          )}

          {session ? (
            <button className="hover:text-white " onClick={() => signOut()}>Logout</button>
          ) : (
            <Link className="hover:text-white" href="/auth/signIn">
              Login
            </Link>
          )}
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
