import User from "../models/User";

const findUserById = async (userData: { id: string; email: string }) => {
  const id = userData.id;
  const user = await User.findById(id);

  return user;
};

export default findUserById;
