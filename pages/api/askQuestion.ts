// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebase/firebaseAdmin";

type Data = {
  answer: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "プロンプトがありません" });
    return;
  }

  if (!model) {
    res.status(400).json({ answer: "モデルがありません" });
    return;
  }

  const response = await query(prompt, chatId, model);

  const message = {
    text: response || "Chatgptは答えを見つけることができませんでした",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "CHATGPT",
      name: "CHATGPT",
      avater: "http://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
};

export default handler;
