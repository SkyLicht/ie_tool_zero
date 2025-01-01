export class CustomError extends Error {
  name = "CustomError";
  extraProp = "ERROR: test";
}

export class HTTP_401_Error extends Error {
  name = "HTTP 401 Error";
  extraProp = "ERROR: test";
}

export class ServerUnreachableError extends Error {
  name = "Server Unreachable Error";
  extraProp = "ERROR: test";
}

export const customPackagedError = [
  CustomError,
  HTTP_401_Error,
  ServerUnreachableError,
];

export function catchErrorTyped<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorToCatch?: E[],
  dataParser?: (data: T) => void,
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promise
    .then((data) => {
      if (dataParser) {
        dataParser(data);
      }
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      if (errorToCatch == undefined) {
        return [error];
      }

      if (errorToCatch.some((err) => error instanceof err)) {
        return [error];
      }

      console.log("error", error);
      throw error;
    });
}
