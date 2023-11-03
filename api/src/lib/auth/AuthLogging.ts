import { LogLevel, type LoggerOptions } from '@azure/msal-common';

export const getLoggerOptions: () => LoggerOptions = (logLevel: LogLevel = LogLevel.Verbose, overrides?: Partial<LoggerOptions>) => ({
  loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
    if (containsPii) {
      return;
    }
    switch (level) {
      case LogLevel.Error:
        console.error(message);
        return;
      case LogLevel.Info:
        console.info(message);
        return;
      case LogLevel.Verbose:
        console.debug(message);
        return;
      case LogLevel.Warning:
        console.warn(message);
        return;
    }
  },
  piiLoggingEnabled: false,
  logLevel,
  ...overrides,
});