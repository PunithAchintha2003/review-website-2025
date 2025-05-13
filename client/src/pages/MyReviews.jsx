import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";
import CofirmBox from "../component/CofirmBox";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import Loading from "../component/Loading";
import NoData from "../component/NoData";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await Axios.get(`api/review/user/${user._id}`);
        setReviews(response.data.data); // Extracting the 'data' property
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchReviews();
    }
  }, [user]);

  const handleDelete = async (reviewId) => {
    try {
      await Axios.delete(`api/review/delete/${reviewId}`);
      setReviews(reviews.filter(review => review._id !== reviewId));
      toast.success("Review deleted successfully");
    } catch (error) {
      AxiosToastError(error);
    }
  };

  if (loading) return <Loading />;

  if (reviews.length === 0) return <NoData message="No reviews found." />;

  return (
    <div className="my-reviews">
      <h1>My Reviews</h1>
      <ul>
        {reviews.map((review) => (
          review ? (
            <li key={review._id} className="review-item" style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '15px', margin: '10px 0', backgroundColor: '#fff' }}>
              <div className="review-heading" style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '10px' }}>{review.reviewHeading}</div>
              <div className="review-text" style={{ fontSize: '1em', color: '#555' }}>{review.reviewText}</div>
              <button onClick={() => handleDelete(review._id)} style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
};

export default MyReviews;