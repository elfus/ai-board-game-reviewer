import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="flex place-content-center place-items-center h-screen ">
      <div className="grid grid-rows-3 ">
        <div className="border-2 font-bold border-amber-300 border-solid rounded-md bg-red-200 text-center">
          <span className="text-3xl">Something went wrong 😢</span>
          <p className="text-lg my-2">{error.data || error.message}</p>
        </div>
        <button className="mt-8 font-bold border-2 border-amber-300 border-solid rounded-full outline-8 bg-blue-500" onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  );
}

export default Error;
