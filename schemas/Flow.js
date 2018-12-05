// The Flow schema represents the configuration and current state of a NiFi Flow
const Flow = {
  UID: '',
  // String - Flow Unique Identifier; FLOWS table pk column;

  name: '',
  // String - Human readable name of the Flow

  user_id: '',
  // String - Flow author's ONA User ID

  form_id: '',
  // String - Flow source ONA Form ID

  fields: [''],
  // [Strings] - Fields to include from ONA Form

  auto_refresh: true,
  // Boolean - Flow should auto-refresh or requre manual pulls

  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: new Date(),
  // Date - CrUD timestamps for FLOW table rows

  oauth_access_token: '',
  // String - ONA oAuth2 Access Token

  oauth_refresh_token: '',
  // String - ONA oAuth2 Refresh Token
};
