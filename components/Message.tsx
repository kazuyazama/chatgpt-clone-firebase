import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";

type Props = {
  message: DocumentData;
};

const Message = ({ message }: Props) => {
  const isChatgpt = message.user.name === "CHATGPT";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`py-5 text-white ${isChatgpt && "bg-[#434654]"}`}
    >
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img
          src={message.user.avater}
          alt={message.user.name}
          className="h-8 w-8"
        />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </motion.div>
  );
};

export default Message;
