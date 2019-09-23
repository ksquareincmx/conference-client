export interface IAppError {
  type: string;
}

export enum AppErrorTypes {
  NETWORK_ERROR = "NETWORK_ERROR",
}

export const appError = (type: AppErrorTypes) => ({
  type,
});
