export interface Message {
  id: number;
  title: string;
  text: string;
  key?: string;
  classes?: string | string[];
}
