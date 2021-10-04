import * as functions from 'firebase-functions';
import express, { NextFunction, Request, Response } from "express"
import facilities from "./facilities"
import reservations from "./reservations"

const app = express()
app.use("/api/facilities",facilities)
app.use("/api/reservations",reservations)
app.get("error",(req,res,next) => {
  next(new Error("エラーです"))
})
app.use((error:Error, req: Request, res: Response, next:NextFunction) => {
  if (res.headersSent) {
    return next(error)
  }
  //エラ〜メッセージをそのまま返すのは開発時のみとする
  //本番環境では、セキュリティーリスクとなる
  res.status(500).send(error.message)
})

export const fn = functions.https.onRequest(app)