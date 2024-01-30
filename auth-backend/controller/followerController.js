const User = require("../model/UserModel");

exports.addFollower = async (req, res) => {
  const userId = req.user.userId;
  const usernameTobeAdd = req.body.usernameTobeAdd;
  try {
    const user = await User.findOne({ username: usernameTobeAdd }, "follower");
    const newFollower = user.follower + 1;
    await User.findOneAndUpdate(
      { username: usernameTobeAdd },
      { $set: { follower: newFollower } }
    );

    await 
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
};
