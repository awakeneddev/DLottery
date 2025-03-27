// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Lottery is Initializable, OwnableUpgradeable {
    struct LotteryDetails {
        address owner;
        string name;
        string description;
        uint ticketPrice;
        uint256 totalPrize;
        address[] participants;
        bool isOpen;
        uint endTIme;
        uint maxTicket;
    }

    uint public lotteryCount;
    mapping(uint => LotteryDetails) public lotteries;

    // event for new lottery creation
    event LotteryCreated(
        uint lotteryId,
        string name,
        uint ticketPrice,
        uint endTime
    );

    // event for ticker purchased
    event TicketPurchased(
        uint lotteryId,
        string name,
        address buyer,
        uint ticketPrice
    );

    function initialize() public initializer {
        __Ownable_init(msg.sender); // Initialize OwnableUpgradeable
    }

    // function to create lottery
    function createLottery(
        string memory _name,
        string memory _description,
        uint _maxTicket,
        uint _ticketPrice,
        uint _totalPrize,
        uint _durationInMinutes
    ) external onlyOwner {
        lotteryCount++;
        LotteryDetails storage newLottery = lotteries[lotteryCount];
        newLottery.owner = msg.sender;
        newLottery.name = _name;
        newLottery.description = _description;
        newLottery.ticketPrice = _ticketPrice;
        newLottery.totalPrize = _totalPrize;
        newLottery.isOpen = true;
        newLottery.endTIme = _durationInMinutes;
        newLottery.maxTicket = _maxTicket;

        emit LotteryCreated(
            lotteryCount,
            _name,
            _ticketPrice,
            newLottery.endTIme
        );
    }

    // function to get all lotteries
    function getAllLotteries() external view returns (uint[] memory) {
        uint[] memory lotteryIds = new uint[](lotteryCount);
        for (uint i = 1; i <= lotteryCount; i++) {
            lotteryIds[i - 1] = i;
        }
        return lotteryIds;
    }

    // function to lottery details
    function lotteryDetails(
        uint _id
    ) external view returns (LotteryDetails memory) {
        LotteryDetails storage lottery = lotteries[_id];
        return lottery;
    }

    // function to buy ticketk
    function buyTicket(uint _lotteryId) external payable {
        LotteryDetails storage lottery = lotteries[_lotteryId];

        require(lottery.isOpen, "This Lottery is closed");
        require(
            msg.value == lottery.ticketPrice,
            "You must pay exact ticket price"
        );
        require(
            lottery.participants.length < lottery.maxTicket,
            "Lottery is full already full"
        );

        lottery.participants.push(msg.sender);
        lottery.totalPrize = lottery.ticketPrice * lottery.participants.length;

        emit TicketPurchased(
            _lotteryId,
            lottery.name,
            msg.sender,
            lottery.ticketPrice
        );
    }
}
