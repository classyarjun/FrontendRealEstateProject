// export class Admin {
//   adminId?: number;
//   username: string = '';
//   password: string = '';
//   email: string = '';
//   fullName: string = '';
//   profilePicture?: File | null;
// }


export class Admin {
  adminId?: number;
  username: string;
  fullname: string;
  email: string;
  password: string;
  mobileNo: string;
  role: string;
  status: string;
  profilePicture?: File;

  constructor(
    username: string,
    fullname: string,
    email: string,
    password: string,
    mobileNo: string,
    role: string,
    status: string,
    profilePicture?: File
  ) {
    this.username = username;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.mobileNo = mobileNo;
    this.role = role;
    this.status = status;
    this.profilePicture = profilePicture;
  }
}
