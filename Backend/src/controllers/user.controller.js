import { User } from "../models/user.model.js";

const userRegistration = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      username = "",
      email = "",
      password = "",
      avatar,
      agreeTermConditions,
    } = req.body;

    // Trim values
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const requiredFields = {
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      username: trimmedUsername,
      email: trimmedEmail,
      password: trimmedPassword,
      agreeTermConditions,
    };

    const missingFields = Object.keys(requiredFields).filter(
      (field) => !requiredFields[field]
    );

    if (missingFields.length > 0) {
      const message = `Please fill in the following required fields: ${missingFields.join(", ")}`;
      return res.status(400).json({ message });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username: trimmedUsername }, { email: trimmedEmail }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already in use",
      });
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    console.log(req.file);

    // // Create and save the new user
    // const newUser = new User({
    //   firstName: trimmedFirstName,
    //   lastName: trimmedLastName,
    //   username: trimmedUsername,
    //   email: trimmedEmail,
    //   password: hashedPassword,
    //   avatar,
    //   agreeTermConditions,
    // });

    // await newUser.save();

    // res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    let { username = "", password = "", rememberMe } = req.body;
    console.log(typeof password);

    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Use async/await instead of callback
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Assuming isPasswordCorrect is an instance method of user
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const accessToken = user.generateAccessToken();

    return res.status(200).json({
      message: "User logged in successfully",
      accessToken: accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export { userRegistration, userLogin };
