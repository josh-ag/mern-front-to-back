import axios from "axios";
const API_BASE_URL = "/api/goals";

//get goals;
const getGoals = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(API_BASE_URL, {
    headers: { authorization: `Bearer ${token}` },
  });

  return response.data;
};

//get goals;
const getGoal = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.get(`${API_BASE_URL}/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  return response.data;
};

//create goal;
const createGoal = async (goalData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.post(API_BASE_URL + "/", goalData, {
    headers: { authorization: `Bearer ${token}` },
  });

  return response.data;
};

//upgate a goal;
const updateGoal = async (updatedGoal) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const { id, goal } = updatedGoal;

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    { goal },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

//delete goal;
const deleteGoal = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await axios.delete(API_BASE_URL + `/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  return response.data;
};

const goalServices = { getGoals, getGoal, deleteGoal, createGoal, updateGoal };

//export
export default goalServices;
