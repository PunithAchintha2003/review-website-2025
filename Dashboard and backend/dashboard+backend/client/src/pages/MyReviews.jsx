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
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await Axios.get(`/reviews/user/${user.id}`);
        setReviews(response.data);
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
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
          <li key={review.id} className="review-item">
            <h3>{review.title}</h3>
            <p>{review.content}</p>
            <small>Rating: {review.rating}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviews;