export interface IInitialTask {
    id: string;
    summary: string;
    description: string;
    status: string;
    priority: string;
    issueType: string;
    dueDate: Date;
    labels: string[];
    attachments?: string[];
    createdAt?: string;
    updatedAt?: string;
  }