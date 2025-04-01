// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

contract NextLotteryV1 is
    Initializable,
    VRFConsumerBaseV2Upgradeable,
    ReentrancyGuardUpgradeable
{
    // Use shorter custom errors instead of string messages
    error OnlyOwner();
    error LotteryClosedErr();
    error InvalidPayment();
    error LotteryFull();
    error AlreadyParticipant();
    error NoParticipants();
    error InvalidRequest();

    address internal owner;
    VRFCoordinatorV2Interface COORDINATOR;

    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }

    struct LotteryDetails {
        address owner;
        string name;
        string description;
        uint256 ticketPrice;
        uint256 totalPrize;
        address[] participants;
        mapping(address => bool) participantExists; // Added for quick lookup
        bool isOpen;
        uint256 endTime;
        uint256 maxTicket;
        uint256 requestId;
    }

    struct LotteryRequest {
        uint256 lotteryId;
        address winnerAddress;
    }

    // Chainlink VRF Settings
    uint256 public s_subscription_id;
    bytes32 public s_key_hash;
    uint32 public call_back_gas_limit;
    uint16 public s_requestConfirmations;
    uint32 public num_words;

    uint256 public lotteryCount;
    mapping(uint256 => LotteryDetails) public lotteries;
    mapping(uint256 => LotteryRequest) public requestIdToLotteryId;

    // Events (unchanged)
    event LotteryCreated(
        uint256 lotteryId,
        string name,
        uint256 ticketPrice,
        uint256 endTime
    );
    event TicketPurchased(
        uint256 lotteryId,
        string name,
        address buyer,
        uint256 ticketPrice
    );
    event RandomWordRequested(
        uint256 requestId,
        uint256 lotteryId,
        string name
    );
    event WinnerSelected(address indexed winner, uint256 amount);
    event LotteryClosed(uint256 lotteryId, string name);

    function initialize(
        address _vrfCoordinator,
        uint256 _subscriptionId,
        bytes32 _keyHash,
        uint32 _callbackGasLimit,
        uint16 _requestConfirmations,
        uint32 _numWords
    ) public initializer {
        __VRFConsumerBaseV2_init(_vrfCoordinator);
        __ReentrancyGuard_init();

        owner = msg.sender;
        s_subscription_id = _subscriptionId;
        s_key_hash = _keyHash;
        call_back_gas_limit = _callbackGasLimit;
        s_requestConfirmations = _requestConfirmations;
        num_words = _numWords;
        COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
    }

    function createLottery(
        string memory _name,
        string memory _description,
        uint256 _maxTicket,
        uint256 _ticketPrice,
        uint256 _totalPrize,
        uint256 _durationInMinutes
    ) external onlyOwner {
        uint256 newLotteryId;
        unchecked {
            newLotteryId = ++lotteryCount; // Unchecked safe (won't overflow in practice)
        }

        LotteryDetails storage newLottery = lotteries[newLotteryId];
        newLottery.owner = msg.sender;
        newLottery.name = _name;
        newLottery.description = _description;
        newLottery.ticketPrice = _ticketPrice;
        newLottery.totalPrize = _totalPrize;
        newLottery.isOpen = true;
        newLottery.endTime = _durationInMinutes;
        newLottery.maxTicket = _maxTicket;

        emit LotteryCreated(
            newLotteryId,
            _name,
            _ticketPrice,
            newLottery.endTime
        );
    }

    function getAllLotteries() external view returns (uint256[] memory) {
        uint256[] memory lotteryIds = new uint256[](lotteryCount);
        for (uint256 i = 1; i <= lotteryCount; ) {
            lotteryIds[i - 1] = i;
            unchecked {
                ++i;
            }
        }
        return lotteryIds;
    }

    function lotteryDetail(
        uint256 _lotteryId
    )
        external
        view
        returns (
            address owner_,
            string memory name,
            string memory description,
            uint256 ticketPrice,
            uint256 totalPrize,
            address[] memory participants,
            bool isOpen,
            uint256 endTime,
            uint256 maxTicket,
            uint256 requestId
        )
    {
        LotteryDetails storage lottery = lotteries[_lotteryId];
        return (
            lottery.owner,
            lottery.name,
            lottery.description,
            lottery.ticketPrice,
            lottery.totalPrize,
            lottery.participants,
            lottery.isOpen,
            lottery.endTime,
            lottery.maxTicket,
            lottery.requestId
        );
    }

    function buyTicket(uint256 _lotteryId) external payable nonReentrant {
        LotteryDetails storage lottery = lotteries[_lotteryId];

        // Cache variables in memory
        uint256 ticketPrice = lottery.ticketPrice;
        uint256 participantCount = lottery.participants.length;
        uint256 maxTicket = lottery.maxTicket;
        bool isOpen = lottery.isOpen;

        if (!isOpen) revert LotteryClosedErr();
        if (msg.value != ticketPrice) revert InvalidPayment();
        if (participantCount >= maxTicket) revert LotteryFull();
        if (lottery.participantExists[msg.sender]) revert AlreadyParticipant();

        lottery.participantExists[msg.sender] = true;
        lottery.participants.push(msg.sender);
        lottery.totalPrize += msg.value;

        emit TicketPurchased(_lotteryId, lottery.name, msg.sender, msg.value);
    }

    function requestRandomWords(
        uint256 _lotteryId
    ) public returns (uint256 requestId) {
        LotteryDetails storage lottery = lotteries[_lotteryId];
        if (!lottery.isOpen) revert LotteryClosedErr();
        if (lottery.participants.length == 0) revert NoParticipants();

        requestId = COORDINATOR.requestRandomWords(
            s_key_hash,
            uint64(s_subscription_id),
            s_requestConfirmations,
            call_back_gas_limit,
            num_words
        );

        requestIdToLotteryId[requestId] = LotteryRequest(
            _lotteryId,
            address(0)
        );
        return requestId;
    }

    function closeLottery(uint256 _lotteryId) external onlyOwner nonReentrant {
        LotteryDetails storage lottery = lotteries[_lotteryId];
        if (!lottery.isOpen) revert LotteryClosedErr();
        if (lottery.participants.length == 0) revert NoParticipants();
        if (block.timestamp < lottery.endTime) revert("Lottery ongoing");
        if (lottery.requestId != 0) revert InvalidRequest();

        uint256 requestId = requestRandomWords(_lotteryId);
        lottery.isOpen = false;
        lottery.requestId = requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        LotteryRequest storage request = requestIdToLotteryId[_requestId];
        uint256 lotteryId = request.lotteryId;
        LotteryDetails storage lottery = lotteries[lotteryId];

        if (lottery.participants.length == 0) revert NoParticipants();
        if (lottery.requestId != _requestId) revert InvalidRequest();

        uint256 randomNumber = _randomWords[0];
        uint256 winnerIndex = randomNumber % lottery.participants.length;
        address winner = lottery.participants[winnerIndex];

        request.winnerAddress = winner;
        uint256 prize = lottery.totalPrize; // Cache total prize
        lottery.totalPrize = 0; // Prevent reentrancy
        (bool success, ) = winner.call{value: prize}("");
        if (!success) revert("Transfer failed");

        emit WinnerSelected(winner, lottery.totalPrize);
        emit LotteryClosed(lotteryId, lottery.name);
    }

    receive() external payable {}
}
