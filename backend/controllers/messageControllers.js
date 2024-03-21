const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;

    const senderId = req.user._id;

    console.log(senderId);
    return res.send({message ,recieverId , senderId})
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const recieveMessage = async (req, res) => {};

export { sendMessage, recieveMessage };
