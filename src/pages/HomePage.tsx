import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useContext must be used within a UserContextProvider');
  }

  const [state] = userContext;
    return (
        <div className="flex w-[100%] h-[80vh] mx-auto justify-center items-center">
            <h1 className="text-[50px] mx-auto font-bold">
                Halo, {state.user.name === '' ? 'Admin' : state.user.name}
            </h1>
        </div>
    )
}

export default HomePage