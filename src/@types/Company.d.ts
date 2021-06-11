declare module Company {
  interface CompanySponserInterface {
    _id?: string;
    sponser_type: string;
    company: CompanyInterface;
  }

  interface LinkInterface {
    _id?: string;
    name: string;
    url: string;
  }

  interface CompanyInterface {
    [readonly _id: string]: string;
    name: string;
    contact: string;
    address: string;
    links: Link[];
    image: string;
    __v?: 0;
    updated_at: string;
  }
}
