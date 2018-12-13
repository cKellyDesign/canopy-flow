// The User schema represents the configuration and current state of a NiFi Flow
const User = {
  UID: '',
  // String - User Unique Identifier; USERS table pk column;

  name: '',
  // String - Human readable name of the Flow

  user_id: '',
  // String - User's ONA User ID

  access_token: '',
  // String - User's permenant access_token
  
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: new Date(),
  // Date - CrUD timestamps for USERS table rows
};
