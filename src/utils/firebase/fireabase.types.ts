export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  email: string;
} & AdditionalInformation;
