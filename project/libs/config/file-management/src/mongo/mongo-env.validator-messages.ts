export enum MongoEnvValidationMessage {
  Host = 'Host must be a valid URL',
  Port = 'Port must be a number between 1 and 65535',
  Database = 'Database must be a string',
  Username = 'Username must be a string',
  Password = 'Password must be a string',
  AuthDatabase = 'Auth database must be a string',
}
