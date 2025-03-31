const { ObjectId } = require("mongodb");
const { getUserModel } = require("../model/user.model");
const getUser = async (userIds, db) => {
  let ans = [];
  const userModel = getUserModel(db);
  for (let row of userIds) {
    const user = await userModel.findOne({ _id: new ObjectId(row._id) });
    ans.push(user);
  }

  return [...ans];
};

module.exports = { getUser };
