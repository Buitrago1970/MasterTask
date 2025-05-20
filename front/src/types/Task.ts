export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
}