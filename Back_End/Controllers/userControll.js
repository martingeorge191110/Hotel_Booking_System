import User from "../Modules/users.js"
import bcrypt from "bcrypt"


const addUser = async (req, res) => {
   try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const existingUser = await User.findOne({ userEmail: req.body.email });
      if (existingUser) {
         return res.status(400).json({
            success: false,
            message: "Email already exists",
         });
      }

      const userDoc = await User.create({
         userName: req.body.name,
         userEmail: req.body.email,
         userPassword: hash,
      });

      res.status(200).json({
         success: true,
         data: userDoc,
      });
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "Failed to post the data",
         error: err.message,
      });
   }
}

const getUser = async (req, res) => {
   try {
      const userDoc = await User.findOne({ userEmail: req.body.email });
      
      if (!userDoc) {
          return res.status(400).json({
              success: false,
              message: "Please register because your email does not exist"
          });
      }
      
      const passwordCorrect = await bcrypt.compare(req.body.password, userDoc.userPassword);
      
      if (!passwordCorrect) {
          return res.status(400).json({
              success: false,
              message: "Incorrect password"
          });
      }
      
      return res.status(200).json({
          success: true,
          data: userDoc
      });
  } catch (err) {
      return res.status(500).json({
          success: false,
          message: "Failed to get the desired data",
          error: err.message
      });
  }
}

export { addUser, getUser }
