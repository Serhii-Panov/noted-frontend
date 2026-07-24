export interface Note {
  id: string;
  title: string;
  content: string;
  is_completed: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}
export interface CreateNote {
  title: string;
  content: string;
  is_completed: boolean;
  priority: number;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

