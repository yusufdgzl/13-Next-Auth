
import { signOut, useSession } from "next-auth/react";


function HomePage() {

  const {data : session} = useSession();
 

  if(!session){
    return(
      <div className="flex flex-col w-full h-[600px] items-center justify-center ">
        <h1 className="text-[100px] ">Please Login !</h1>
      
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col w-full h-[600px] items-center justify-center ">
        <h1 className="text-[100px] font-mono ">Welcome {session.user.name}... </h1>
      </div>
    </>
  );
}

export default HomePage;
