export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function createChatStore() {
  let sessions = $state<Session[]>([]);
  let activeSessionId = $state<string>("");
  let streaming = $state(false);

  // Create initial session
  const initialSession: Session = {
    id: generateId(),
    title: "新对话",
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  sessions.push(initialSession);
  activeSessionId = initialSession.id;

  function getActiveSession(): Session | undefined {
    return sessions.find((s) => s.id === activeSessionId);
  }

  return {
    get sessions() { return sessions; },
    get activeSessionId() { return activeSessionId; },
    set activeSessionId(id: string) { activeSessionId = id; },
    get streaming() { return streaming; },
    get activeSession() { return getActiveSession(); },

    get activeMessages(): Message[] {
      const session = getActiveSession();
      return session?.messages ?? [];
    },

    createSession() {
      const session: Session = {
        id: generateId(),
        title: "新对话",
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      sessions.unshift(session);
      activeSessionId = session.id;
      return session;
    },

    deleteSession(id: string) {
      const idx = sessions.findIndex((s) => s.id === id);
      if (idx === -1) return;
      sessions.splice(idx, 1);
      if (activeSessionId === id) {
        if (sessions.length === 0) {
          // Create a new session if all deleted
          const newSession: Session = {
            id: generateId(),
            title: "新对话",
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          sessions.push(newSession);
          activeSessionId = newSession.id;
        } else {
          activeSessionId = sessions[0].id;
        }
      }
    },

    clearActiveSession() {
      const session = getActiveSession();
      if (session) {
        session.messages = [];
        session.updatedAt = Date.now();
      }
    },

    async sendMessage(content: string) {
      const session = getActiveSession();
      if (!session) return;

      // Add user message
      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content,
        timestamp: Date.now(),
      };
      session.messages.push(userMsg);
      session.updatedAt = Date.now();

      // Update title from first message
      if (session.messages.length === 1) {
        session.title = content.slice(0, 30) + (content.length > 30 ? "..." : "");
      }

      streaming = true;

      try {
        // Call Wails backend
        const { MsgService } = await import(
          "../../../bindings/github.com/rubberduck-ai/rubberduck/services"
        );
        const reply = await MsgService.SendMessage(content);

        const assistantMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: reply,
          timestamp: Date.now(),
        };
        session.messages.push(assistantMsg);
        session.updatedAt = Date.now();
      } catch (err) {
        const errorMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: "抱歉，发生了错误。请稍后再试。",
          timestamp: Date.now(),
        };
        session.messages.push(errorMsg);
        session.updatedAt = Date.now();
      } finally {
        streaming = false;
      }
    },
  };
}

export const chatStore = createChatStore();
