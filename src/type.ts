export interface TaskInterface {
  id?: string; // Firestore document id
  title: string;
  description: string;
}

export interface NewTaskInterface {
  title: string;
  description: string;
}

export type TaskModalType = "edit" | "new";