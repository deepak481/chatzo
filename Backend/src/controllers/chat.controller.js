import { chatData } from "../constants.js";

const allchats = (req, res) => {
  res.status(200).json({ chatData: chatData });
};

const singlechat = (req, res) => {
  const params = req.params;
  res.status(200).json({ chatData: chatData[parseInt(params.chat_id)] });
};

export { allchats, singlechat };
