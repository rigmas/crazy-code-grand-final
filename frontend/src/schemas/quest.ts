export enum QuestType {
  Question = "question",
  Photo = "photo",
}

export interface Quest {
  id: number
  type: QuestType
  title: string
  reward: number
  is_party: boolean
  done: boolean
}

export interface QuestDetail extends Quest {
  description: string
  objectives: string[]
  lon_lat: number[]
  mind_file?: string
}

export const QuestDummyList: QuestDetail[] = [
  {
    id: 2,
    type: QuestType.Photo,
    title: "Visit the Café and Grab a Drink",
    reward: 50,
    description: `
      Time for a little break! Head over to the cozy hotel café, order your favorite drink, and take a moment to relax.
      \n

      Once you're there, keep an eye out for the special QR code displayed near the counter. Scan it to complete your quest and earn some cool rewards!
    `,
    objectives: [
      "Visit the hotel café",
      "Order any drink of your choice",
      "Scan the QR code near the counter to complete the quest",
    ],
    is_party: false,
    done: false,
    lon_lat: [0, 0],
  },
]
