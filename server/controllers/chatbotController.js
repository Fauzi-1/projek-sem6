const Chatbot = require('../models/Chatbot');

exports.getResponse = async (req, res) => {
  const { message } = req.body;
  try {
    const entries = await Chatbot.find();
    for (let entry of entries) {
      const pattern = new RegExp(entry.questionPattern, 'i');
      if (pattern.test(message)) {
        return res.json({ response: entry.response });
      }
    }
    res.json({ response: 'Maaf, saya tidak mengerti. Coba pertanyaan lain.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addChatResponse = async (req, res) => {
  try {
    const newEntry = new Chatbot(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllChatbots = async (req, res) => {
  try {
    const chatbots = await Chatbot.find();
    res.json(chatbots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateChatbot = async (req, res) => {
  try {
    const updated = await Chatbot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteChatbot = async (req, res) => {
  try {
    await Chatbot.findByIdAndDelete(req.params.id);
    res.json({ message: 'Chatbot berhasil dihapus' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
