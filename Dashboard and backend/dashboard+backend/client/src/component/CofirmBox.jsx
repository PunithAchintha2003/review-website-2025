import { IoClose } from "react-icons/io5";

const CofirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-black/70 p-4 flex justify-center items-center'>
      <div className='bg-white w-full max-w-md p-4 rounded'>
           <div className='flex justify-between items-center gap-3'>
                <h1 className='font-semibold'>Permanent Delete</h1>
                <button onClick={close}>
                    <IoClose size={25} className="bg-green-400 cursor-pointer rounded-sm" />
                </button>
           </div>
           <p className='my-4'>Are you sure Permanent Delete ?</p>
           <div className='w-fit ml-auto flex items-center gap-3'>
                <button onClick={cancel} className='px-4 py-1 border rounded border-red-600 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>Cancel</button>
                <button onClick={confirm} className='px-4 py-1 border rounded border-green-600 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer'>Confirm</button>
           </div>
      </div>
    </div>
  )
}

export default CofirmBox
