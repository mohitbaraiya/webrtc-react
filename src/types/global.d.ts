type UserMediaFunc = (
  config: { video: boolean; audio: boolean },
  callback: (strean: MediaStream | void) => void,
  errorHandler: (err: string | object) => void
) => void;
interface Navigator {
  mozGetUserMedia: UserMediaFunc;
  webkitGetUserMedia: UserMediaFunc;
  getUserMedia: UserMediaFunc;
}
