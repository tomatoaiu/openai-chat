import { useState, useCallback } from "react";
import { Conversation, openai } from "./fetch";
import { appStyle } from "./app.css";

function truncatedConversations(
  conversationList: Conversation[]
): Conversation[] {
  const squashMessages = JSON.stringify(conversationList);
  let newList = conversationList;
  if (squashMessages.length > 700) {
    newList = conversationList.slice(1);
    const newSquashMessages = JSON.stringify(newList);
    if (newSquashMessages.length > 700) {
      return truncatedConversations(newList);
    }
  }
  return newList;
}

export function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationList, setConversationList] = useState<Conversation[]>([]);

  const send = useCallback(() => {
    setLoading(true);
    const newMessage: Conversation = { role: "user", content: message };
    const newMessageList = truncatedConversations(
      conversationList.concat([newMessage])
    );
    openai(newMessageList)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const responseMessage: Conversation = {
          role: "assistant",
          content: data.choices[0].message.content,
        };
        const newConversationList = truncatedConversations(
          newMessageList.concat([responseMessage])
        );
        console.log(newConversationList);

        setConversationList(newConversationList);
        setLoading(false);
      });
  }, [message, conversationList]);

  return (
    <main>
      <h1>OpenAI Chat</h1>
      <form className={appStyle.form}>
        <label>
          メッセージ
          <input
            className={appStyle.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <label className={appStyle.send}>
          送信
          <button type="button" onClick={() => send()} disabled={loading}>
            メッセージの送信
          </button>
        </label>
      </form>
      {loading && <p>loading...</p>}
      <ul className={appStyle.ul}>
        {conversationList.map((conversation, index) => (
          <li
            key={index}
            className={`
              ${
                conversation.role === "user"
                  ? appStyle.user
                  : appStyle.assistant
              }
              ${appStyle.list}
            `}
          >
            <span className={appStyle.name}>{conversation.role}</span>
            <p className={appStyle.message}>{conversation.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
