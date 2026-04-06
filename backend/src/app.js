import express from 'express';

const app = express() // create an express app

app.use(express.json()) // middleware to parse JSON request bodies

// import routes

import userRouter from './routes/user.route.js';

//routes edclaration
app.use("/api/v1/users", userRouter)

export default app;