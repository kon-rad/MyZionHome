// Concierge conversation log in Firestore. Server-only.
//   concierge_conversations/{sessionId}            uid, startedAt, lastMessageAt, messageCount
//   concierge_conversations/{sessionId}/messages/* role, content, createdAt (+ model)
// Logging must never break the chat, so failures are swallowed.
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "./firebase";

export const SESSION_ID = /^[A-Za-z0-9-]{8,64}$/;

export async function logExchange(e: {
  sessionId: string;
  uid: string | null;
  email: string | null;
  user: string;
  assistant: string;
  model: string;
  incomplete: boolean;
}): Promise<void> {
  try {
    const db = getDb();
    if (!db) return;
    const convo = db.collection("concierge_conversations").doc(e.sessionId);
    const msgs = convo.collection("messages");
    const now = new Date().toISOString();
    const isNew = !(await convo.get()).exists;
    const batch = db.batch();
    batch.set(
      convo,
      {
        // Keep the first signed-in uid once known; anonymous chats stay null.
        ...(isNew ? { startedAt: now } : {}),
        ...(e.uid ? { uid: e.uid, email: e.email } : {}),
        lastMessageAt: now,
        messageCount: FieldValue.increment(2),
      },
      { merge: true }
    );
    batch.set(msgs.doc(), { role: "user", content: e.user, createdAt: now });
    batch.set(msgs.doc(), {
      role: "assistant",
      content: e.assistant,
      model: e.model,
      incomplete: e.incomplete,
      createdAt: new Date(Date.now() + 1).toISOString(),
    });
    await batch.commit();
  } catch {
    // ignore
  }
}
