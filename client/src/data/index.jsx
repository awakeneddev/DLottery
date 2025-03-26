const LOTTERIES = [
  {
    id: 1,
    name: "Mega Jackpot",
    description: "Win big with our weekly Mega Jackpot!",
    isOpen: true,
    endTime: new Date().getTime() + 86400000, // Closes in 24 hours
    maxTicket: 100,
    participants: Array(50).fill("0x123...456"), // 50 participants
    totalPrize: 10.5, // ETH
    ticketPrice: 0.1, // ETH per ticket
  },
  {
    id: 2,
    name: "Crypto Lucky Draw",
    description: "A lucky draw for all crypto enthusiasts!",
    isOpen: false,
    endTime: new Date().getTime() - 3600000, // Closed 1 hour ago
    maxTicket: 200,
    participants: Array(200).fill("0xabc...789"), // Full participants
    totalPrize: 15.2, // ETH
    ticketPrice: 0.05, // ETH per ticket
  },
  {
    id: 3,
    name: "Ethereum Raffle",
    description: "Join and win exciting Ethereum prizes!",
    isOpen: true,
    endTime: new Date().getTime() + 43200000, // Closes in 12 hours
    maxTicket: 50,
    participants: Array(20).fill("0xdef...123"), // 20 participants
    totalPrize: 5.75, // ETH
    ticketPrice: 0.2, // ETH per ticket
  },
];

export { LOTTERIES };
