// models/agent.model.ts
export class Agent {
  id?: number; // Optional because it's auto-generated.
  username!: string;
  fullname!: string;
  email!: string;
  password!: string;
  mobileNo!: string;
  role!: string; // ADMIN or AGENT.
  profilePicture?: File | string; // Use File for uploads or string for displaying image URLs.
  experience!: number;
  rating?: number; // Optional if not required during registration or login.
  bio?: string; // Optional if not required during registration or login.
  createdAt?: Date; // Auto-generated from the backend.
  updatedAt?: Date; // Auto-generated from the backend.
  status!: string; // ACTIVE or INACTIVE.
}
