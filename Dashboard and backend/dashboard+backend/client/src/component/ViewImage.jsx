import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types';

const ViewImage = ({url,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 flex justify-center items-center z-50 p-4'>
        <div className='w-full max-w-md border max-h-[80vh] rounded-sm p-4 bg-green-100'>
            <button onClick={close} className='w-fit ml-auto mb-1 rounded-sm cursor-pointer text-white bg-green-600 block'>
                <IoClose size={25}/>
            </button>
            <img 
                src={url}
                alt='full screen'
                className='w-full h-full object-scale-down'
            />
        </div>
    </div>
  )
}

ViewImage.propTypes = {
  url: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default ViewImage
