// import React, { useState,useEffect} from 'react'

// const Reviews = ({data}) => {
//     const slug=data;
//     const [reviews,setReviews]=useState()
//     useEffect(() => {
//         // Fetch user data from API
//         fetch(`http://localhost:3000/review/${slug}`)
//         .then((response)=>(response.json()) )
//         .then((data)=>(setReviews(data)))
//         .catch((err)=>(console.log(err)))

//       }, [slug]);
//       console.log("reviews",reviews)
//   return (

//     <div>Reviews</div>
//   )
// }

// export default Reviews
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Reviews = ({ data }) => {
  const service_id = data;

  const [allReviews, setAllReviews] = useState([]);
  const [user_id, setUser_id] = useState();
  const [newReview, setNewReview] = useState("");
  // Fetch reviews from the API
  useEffect(() => {
    const user = localStorage.getItem("user_id");
    setUser_id(user);
    console.log("here ", service_id);
    fetchReviews();
    console.log("All reviews", allReviews);
  }, [service_id]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/reviews/${service_id}`
      );
      const data = await response.json();
      setAllReviews(data);
      console.log(allReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const addReview = async () => {
    if (newReview.trim() !== "") {
      try {
        const response = await fetch(`http://localhost:3000/reviews/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ newReview, service_id, user_id}),
        });
        // const data = await response.json();
        if (response.ok) 
        toast("review added");
        else 
        toast("error adding review");
        fetchReviews();
        // setAllReviews([...allReviews, data]);
        setNewReview("");
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  const removeReview = async (rev_id) => {
    try {
      await fetch(`http://localhost:3000/reviews/${rev_id}`, {
        method: "DELETE",
      });
      const updatedReviews = allReviews.filter(
        (review) => review.rev_id !== rev_id
      );
      setAllReviews(updatedReviews);
      toast("review deleted")
    } catch (error) {
      console.error("Error removing review:", error);
    }
  };

  return (
    <div className="mt-8">
      <ToastContainer />
      <h3 className="text-2xl font-bold mb-4">Reviews</h3>
      {allReviews?.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {allReviews?.map((review) => (
            <li key={review?.rev_id} className="border p-4 rounded-lg">
              <p className="text-gray-800 mb-2">{review?.rev_description}</p>
              {/* <p className="text-gray-500">- {review.author}</p> */}
              {review.user_id == user_id && (
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeReview(review?.rev_id)}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <textarea
          className="w-full px-4 py-2 border rounded-lg"
          rows="4"
          placeholder="Add your review"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          onClick={addReview}
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default Reviews;
