declare module Competition {
  interface CompeitionInterface {
    [readonly _id: string]: string;
    categories: string[];
    startDate: string;
    endDate: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    __v?: number;
    totalSponsers?: number;
    totalPosts?: number;
    totalModerators?: number;
    totalEditors?: number;
    totalAdmins?: number;
    isActive: boolean;
    posts?: Post.PostInterface[];
    admins?: User.UserInterface[];
    moderators?: User.UserInterface[];
    editors?: User.UserInterface[];
    sponsors: Company.CompanySponserInterface[];
  }
}
