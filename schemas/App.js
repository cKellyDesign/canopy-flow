// The App schema represents the ONA oAuth2 Applications
const App = {
  UID: '',
  // String - App Unique Identifier; APPS table pk column;

  name: '',
  // String - Human readable name of the APP

  user_ids: [''],
  // String - List User IDs of Authorized App Users; Link to USERS model;

  ona_client_id: '',
  // String - ONA oAuth2 App Client ID

  ona_client_secret: '',
  // String - ONA oAuth2 App Client Secret

  kobo_client_id: '',
  kobo_client_secret: '',
  // String - Kobo oAuth2 App Client ID/Secret
  
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: new Date(),
  // Date - CrUD timestamps for FLOWS table rows
};
