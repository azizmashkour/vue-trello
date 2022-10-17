export interface Model {
  readonly id: string;
  toJson (): Record<string, any>;
}
