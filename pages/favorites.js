import { useSession } from "next-auth/react"


function FavoritePage(){

    const {data: session} = useSession();

    if(!session){
        return <h1 className="flex bg-red-400 text-3xl text-center justify-center items-center  h-[100px]">You must login for this page!</h1>
    }
   

    return(
        <h1 className="flex bg-sky-400 text-3xl text-center justify-center items-center  h-[100px]">Favorites Page</h1>
    )

}

export default FavoritePage