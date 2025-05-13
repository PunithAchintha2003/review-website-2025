import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const text = query.get("text") || "Payment";

  return (
    <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
      <p className='text-green-800 font-bold text-lg text-center'>{text} Successfully</p>
      <Link
        to="/dashboard"
        className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1"
      >
        Go To Dashboard
      </Link>
    </div>
  );
};

export default Success;
