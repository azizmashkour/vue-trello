export interface IModel {
  readonly id: string;
  toJson (): Record<string, any>;
}
