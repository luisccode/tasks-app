export interface Task {
  name: string;
  description: string;
  type: "Work" | "Health" | "Personal" | "Other";
  label?: string;
  dueDate: string;
}
