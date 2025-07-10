const express = require("express");
const connectDB = require("./database");
const cors = require("cors");

const projectRoutes = require("./routes/projects");
const clientRoutes = require("./routes/clients");
const contactRoutes = require("./routes/contacts");
const subscriptionRoutes = require("./routes/subscriptions");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://real-trust-five.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Database connection
connectDB();

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin", adminRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
