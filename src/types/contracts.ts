export interface LixiContract {
  createLixi: (
    amount: string,
    recipients: number,
    isRandom: boolean,
    isPublic: boolean,
    message: string,
    expiryDate: number,
  ) => Promise<string>

  claimLixi: (lixiId: string) => Promise<boolean>

  getLixiDetails: (lixiId: string) => Promise<{
    creator: string
    totalAmount: string
    remainingAmount: string
    recipientsCount: number
    remainingRecipients: number
    isRandom: boolean
    isPublic: boolean
    message: string
    expiryDate: number
    isActive: boolean
  }>
}

