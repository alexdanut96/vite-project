import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.session.id);
  req.session.visited = true;
  res.redirect("http://localhost:5173");
  // res.status(200).send({ message: "get test" });
});

router.get("/cookie", async (req, res) => {
  console.log(req.session.id);
  req.sessionStore.get(req.session.id, (error, sessionData) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(sessionData);
  });

  res.status(400).send({ message: "get test/cookie" });
});

export default router;
