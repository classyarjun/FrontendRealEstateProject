


export class Agent {
  id?: number;
  userName: string = '';
  fullName: string = '';
  email: string = '';
  password: string = '';
  mobileNo: string = '';
  experience: number = 0;
  rating: number = 0;
  bio: string = '';
  status: string = 'PENDING'; // Default Status
  approved: boolean = false;
  profilePicture?: File;
}
