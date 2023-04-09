import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export const fetchMeals = async () => {
  return axios
    .get(`${BASE_URL}/meals`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const fetchMealsWithTitle = async (title) => {
  return axios
    .get(`${BASE_URL}/meals?title=${title}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const fetchMealById = async (id) => {
  return axios
    .get(`${BASE_URL}/meals/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const fetchMealsWithAvailableSpots = async () => {
  return axios
    .get(`${BASE_URL}/meals/?availableReservations=true`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const addReservation = async (reservation) => {
  return axios
    .post(`${BASE_URL}/reservations`, reservation)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const fetchReviews = (mealId) => {
  return axios
    .get(`${BASE_URL}/reviews?meal_id=${mealId}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const addReview = (review) => {
  return axios
    .post(`${BASE_URL}/reviews`, review)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const deleteReview = (id) => {
  return axios
    .delete(`${BASE_URL}/reviews/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const updateReview = (id, updatedReview) => {
  return axios
    .put(`${BASE_URL}/reviews/${id}`, updatedReview)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
