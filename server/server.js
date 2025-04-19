import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import registerRoute from "./routes/register.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import billingRoute from "./routes/billing.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import stripeRoute from "./routes/stripe.js";
import adminRoute from "./routes/admin.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/register", registerRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/billing", billingRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});
