import { IconType } from "react-icons";

declare module CounterTypes {
  interface props {
    Icon?: IconType;
    name: string;
    count: number;
    booleanField?: boolean;
    subType?: any;
    gradientType?: any;
  }
}
