export class User {
  id?: number;
  username!: string;
  fullname!: string;
  email!: string;
  password!: string;
  mobileNo!: string;
  address?: string;
  gender?: string;
  role?: string;
  profilePicture?: File; // For uploading profile picture
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
