export interface TaskInterface {
  id: number;
  title: string;
  description: string;
}

export interface NewTaskInterface {
  title: string;
  description: string;
}

export type TaskModalType = "edit" | "new";