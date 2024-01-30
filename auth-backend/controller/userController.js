const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

exports.addUser = async (req, res) => {
  const { firstName, lastName, email, password, number, username } = req.body;
  const saltRounds = 10;
  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new Error("User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userDetails = await User.create({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: hashedPassword,
      number: number,
      username: username,
    });

    res.status(201).json(userDetails);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const createJwt = (id) => {
  const userid = {
    userId: id,
  };
  const token = jwt.sign(userid, process.env.SECRET_KEY);
  return token;
};

exports.checkUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existedUser = await User.findOne({ email: email });

    if (!existedUser) {
      throw new Error("User not found");
    }
    const isCorrectPass = await bcrypt.compare(password, existedUser.password);
    if (!isCorrectPass) {
      throw new Error("Invalid Password");
    } else {
      const token = createJwt(existedUser._id);
      res.status(200).json({ success: true, token: token });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const currentPage = req.params.page;
  const userId = req.user.userId;
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  try {
    const userData = User.findOne({ _id: userId }, "firstname follower");

    const totalUsers = await User.countDocuments();

    const usersData = User.find({}, "firstname username")
      .skip(offset)
      .limit(limit);

    const [user, users] = await Promise.all([userData, usersData]);

    const userDetails = users.filter((user) => {
      return user._id.toString() !== userId;
    });
    
    const pageDetails = {
      currentPage: currentPage,
      totalPages: Math.ceil(totalUsers / limit),
    };

    res.status(200).json({ usersData: userDetails, user: user, pageDetails });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ error: "Not found" });
  }
};
