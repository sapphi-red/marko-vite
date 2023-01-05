export interface BuildStore {
  has(key: string): Promise<boolean>;
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): Promise<void>;
}
