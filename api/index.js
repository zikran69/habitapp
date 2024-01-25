const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://zikran69:zikran69@cluster0.wiaz0b7.mongodb.net/HabitApp",
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//endpoint to create a habit in backend:
const Habit = require("./models/habit");
app.post("/habits", async (req, res) => {
  try {
    const { title, color, repeatMode, reminder } = req.body;

    const newHabit = new Habit({
      title,
      color,
      repeatMode,
      reminder,
    });

    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//fetch data from backend

app.get("/habitslist", async (req, res) => {
  try {
    const allHabits = await Habit.find({});

    res.status(200).json(allHabits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/habits/:habitId/completed/:day", async (req, res) => {
  try {
    const { habitId, day } = req.params;
    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    habit.completed[day] = true;

    await habit.save();

    res.status(200).json({ message: "Habit completed status updated" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error.message });
  }
});
