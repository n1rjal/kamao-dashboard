declare module Card {
  interface CardProps {
    [readonly _id: string]: string;
    title: string;
    totalSponsers: number;
    totalMember: number;
    description: string;
  }
}
