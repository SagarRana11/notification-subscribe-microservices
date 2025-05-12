const { ObjectId } = require("mongodb");

const { getRespectiveModel } = require("../utils/dbHelpers");
const { USER } = require("../model/collectionsName");

const getUser = async (userIds, db) => {
  let ans = [];
  const userModel = getRespectiveModel(db, USER);
  for (let row of userIds) {
    const user = await userModel.findOne({ _id: new ObjectId(row._id) });
    ans.push(user);
  }

  return [...ans];
};

module.exports = { getUser };
