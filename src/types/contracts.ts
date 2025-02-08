export interface LixiContract {
  createLixi: (
    amount: string,
    recipients: number,
    isRandom: boolean,
    isPublic: boolean,
    message: string,
    expiryDate: number
  ) => Promise<string>;

  claimLixi: (lixiId: string) => Promise<boolean>;

  getLixiDetails: (lixiId: string) => Promise<{
    creator: string;
    totalAmount: string;
    remainingAmount: string;
    recipientsCount: number;
    remainingRecipients: number;
    isRandom: boolean;
    isPublic: boolean;
    message: string;
    expiryDate: number;
    isActive: boolean;
  }>;
}

export const contractABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "envelopeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "remainingAmount",
        type: "uint256",
      },
    ],
    name: "EnvelopeClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "envelopeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfPackets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "envelopeType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "EnvelopeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "envelopeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "packetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PacketClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "envelopeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "ENVELOP_TYPE_EQUAL",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ENVELOP_TYPE_RANDOM",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PACKET_STATUS_CANCELLED",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PACKET_STATUS_CLAIMED",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PACKET_STATUS_UNCLAIMED",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "envelopeId", type: "uint256" },
      { internalType: "uint256", name: "packetId", type: "uint256" },
    ],
    name: "claimPacket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_numberOfPackets", type: "uint256" },
      { internalType: "string", name: "_envelopeType", type: "string" },
      { internalType: "string", name: "_message", type: "string" },
    ],
    name: "createEnvelope",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "envelopes",
    outputs: [
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "uint256", name: "totalFund", type: "uint256" },
      { internalType: "uint256", name: "remainingAmount", type: "uint256" },
      { internalType: "uint256", name: "numberOfPackets", type: "uint256" },
      { internalType: "string", name: "envelopeType", type: "string" },
      { internalType: "string", name: "message", type: "string" },
      { internalType: "bool", name: "isActive", type: "bool" },
      { internalType: "uint256", name: "createdAt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "envelopeId", type: "uint256" }],
    name: "getPacketsByEnvelope",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "envelopeId", type: "uint256" }],
    name: "getPacketsByEnvelopeId",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "string", name: "status", type: "string" },
          { internalType: "address", name: "receiver", type: "address" },
        ],
        internalType: "struct RedEnvelope.Packet[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "maxAmount", type: "uint256" }],
    name: "getRandomNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextEnvelopeId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextPacketId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "packetToEnvelope",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "packets",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "string", name: "status", type: "string" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "envelopeId", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
