/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IObject<T = any> {
  [key: string]: T;
}
