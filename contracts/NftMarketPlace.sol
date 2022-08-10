// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error NftMarketPlace__PriceMustBeAboveZero();
error NftMarketPlace__NotApprovedForMarketPlace();
error NftMarketPlace__AlreadyListed(address nftAddress, uint256 tokenId);
error NftMarketPlace__NotListed(address nftAddress, uint256 tokenId);
error NftMarketPlace__NotOwner();
error NftMarketPlace__PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error NftMarketPlace__NoProceeds();
error NftMarketPlace__TransfereFailed();

contract NftMarketPlace is ReentrancyGuard {
    struct Listing {
        uint256 price;
        address seller;
    }

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );
    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftaddress,
        uint256 indexed tokenId
    );

    //    NFT Contract Address -> NFT TokenID ->Listing

    mapping(address => mapping(uint256 => Listing)) private s_listings;

    // Seller address -> Amount earned
    mapping(address => uint256) private s_proceeds;

    ///////////////////
    //Modifiers     //
    /////////////////

    modifier notListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert NftMarketPlace__AlreadyListed(nftAddress, tokenId);
        }
        _;
    }
    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NftMarketPlace__NotListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NftMarketPlace__NotOwner();
        }
        _;
    }

    ///////////////////
    //Main Functions//
    /////////////////
    /*
     * @notice Method for listing NFT
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     * @param price sale price for each item
     */
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external notListed(nftAddress, tokenId) isOwner(nftAddress, tokenId, msg.sender) {
        if (price <= 0) {
            revert NftMarketPlace__PriceMustBeAboveZero();
        }

        IERC721 nft = IERC721(nftAddress);
        if (nft.getApproved(tokenId) != address(this)) {
            revert NftMarketPlace__NotApprovedForMarketPlace();
        }

        s_listings[nftAddress][tokenId] = Listing(price, msg.sender);

        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    /*
     * @notice Method for buying listing
     * @notice The owner of an NFT could unapprove the marketplace,
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     */
    function buyItem(address nftAddress, uint256 tokenId)
        external
        payable
        nonReentrant
        isListed(nftAddress, tokenId)
    {
        Listing memory listedItem = s_listings[nftAddress][tokenId];
        if (msg.value < listedItem.price) {
            revert NftMarketPlace__PriceNotMet(nftAddress, tokenId, listedItem.price);
        }
        // Shift the risk associated with transferring ether to the user.
        // https://fravoll.github.io/solidity-patterns/pull_over_push.html
        s_proceeds[listedItem.seller] = s_proceeds[listedItem.seller] + msg.value;
        delete (s_listings[nftAddress][tokenId]);
        IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, tokenId);
        emit ItemBought(msg.sender, nftAddress, tokenId, listedItem.price);
    }

    /*
     * @notice Method for cancelling listing
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     */
    function cancelListing(address nftAddress, uint256 tokenId)
        external
        isOwner(nftAddress, tokenId, msg.sender)
        isListed(nftAddress, tokenId)
    {
        delete (s_listings[nftAddress][tokenId]);

        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    /*
     * @notice Method for updating listing
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     * @param newPrice Price in Wei of the item
     */
    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice
    ) external isOwner(nftAddress, tokenId, msg.sender) isListed(nftAddress, tokenId) {
        s_listings[nftAddress][tokenId].price = newPrice;

        emit ItemListed(msg.sender, nftAddress, tokenId, newPrice);
    }

    /*
     * @notice Method for withdrawing proceeds from sales
     */
    function withdrawProceeds() external nonReentrant {
        uint256 proceeds = s_proceeds[msg.sender];

        if (proceeds <= 0) {
            revert NftMarketPlace__NoProceeds();
        }
        s_proceeds[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: proceeds}("");
        if (!success) {
            revert NftMarketPlace__TransfereFailed();
        }
    }

    /////////////////////
    //Getter  Functions//
    ////////////////////

    function getListing(address nftAddress, uint256 tokenId)
        external
        view
        returns (Listing memory)
    {
        return s_listings[nftAddress][tokenId];
    }

    function getProceeds(address seller) external view returns (uint256) {
        return s_proceeds[seller];
    }
}
