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

  if (loading) return <Loading />;

  if (reviews.length === 0) return <NoData message="No reviews found." />;

  return (
    <div className="my-reviews">
      <h1>My Reviews</h1>
      <ul>
        {reviews.map((review) => (
          review ? (
            <li key={review._id} className="review-item">
              <h3>{review.reviewHeading}</h3>
              <p>{review.reviewText}</p>
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
};

export default MyReviews;