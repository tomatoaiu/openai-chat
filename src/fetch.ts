export type Conversation = {
  role: "user" | "assistant";
  content: string;
};

export async function openai(conversationList: Conversation[]) {
  console.log(conversationList);

  return fetch(
    // @ts-ignore
    process.env.OPENAI_API_BASE +
      "/openai/deployments/gpt-35/chat/completions?api-version=2023-03-15-preview",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        "api-key": process.env.OPENAI_API_KEY ?? "",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "あなたは、質問に回答をするアシスタントです。" },
          // { role: "user", content: "こんにちは" },
          // { role: "assistant", content: "こんにちは！何か質問がありますか？" },
          // { role: "user", content: message }
        ].concat(conversationList),
        max_tokens: 800,
        temperature: 0.7,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 0.95,
        stop: null,
      }),
    }
  );
}
