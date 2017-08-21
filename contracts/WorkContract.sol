pragma solidity ^0.4.13;

/* TODO
*  - Change work_offers to a mapping of address => workOffer
*  - Add mechanism to exit the GatheringDeposits based on time
*  - Add mechanism for version history
*  - Write review contract
*  - Write mechanisms to interact with review contract & stall this
*   contract until the review is finished
*/
contract WorkContract {
  /*
  * Construction Fields
  */

  // Contract Contributers
  address public employer;
  address public worker;
  address[] public reviewers;

  // Contract Stages
  enum Stages {
      AcceptingOffers,
      ReviewContract,
      GatheringDeposits,
      AwaitingJobCompletion,
      Finalize,
      UnderReview,
      Finished
  }
  // Contract Statuses
  enum Statuses{
    Active,
    Successful,
    Revoked,
    Disputed
  }
  
  /// Typedefs
  struct workOffer {
    address account;
    uint price;
    uint review_deposit;
    uint duration;
    uint offer_date;
    uint accept_date;
  }
  struct termAcceptance {
    bool employer;
    bool worker;
  }
  struct workFile {
    string filename;  //This gives a storage warning, which is invalid. Should be patched soon.
    bytes32 shasum;
    uint uploadTime;
  }

  /*
  *   Events
  */
  
  event NewOffer();
  event OfferAccepted();
  event JobRemoved();

  event EmployerAcceptTerms();
  event WorkerAcceptTerms();
  event TermsAccepted();
  event OfferRevoked();

  event DepositConfirmed();
  event DepositFailed();

  event workSubmitted();
  event workTerminated();

  event contractFinalizing();
  event contractFinalized();

  /*
  * Contract Data
  */
  uint public creationTime;
  Stages public stage;
  Statuses status;

  workOffer[] public work_offers;
  workOffer public accepted_offer;

  termAcceptance public contract_acceptance;

  mapping(string => uint) account_ballances;

  mapping(uint => workFile) public submitted_files;

  termAcceptance public work_acceptance;

  /*
  * Constructor
  */
  function WorkContract() {
    require(tx.origin != employer);
    employer = tx.origin;
    creationTime = now;
    stage = Stages.AcceptingOffers;
    status = Statuses.Active;
    contract_acceptance = termAcceptance({ employer: false, worker: false});
    work_acceptance = termAcceptance({employer: false, worker: false});
  }
  function getEmployer() constant returns ( address ) {
    return (employer);
  }
  // Return an 'update' of the stage, status, and particapants
  function getUpdate(address) constant returns (    
    address,
    address,
    address[],
    uint
  ) {
    return (employer, worker,  reviewers, creationTime);
  }

  /*
  * Ownership control
  */  
  // prepends a check that ensures a function is called by param account  
  modifier onlyBy(address _account)
  {
    require(msg.sender == _account);
    _;
  }
  // prepends a check that a function is called by either of the param accounts
  modifier onlyByEither(address _account1, address _account2)
  {
    require(msg.sender == _account1 || msg.sender == _account2);
    _;
  }
  // pretends a check that a function is called by an address in param array
  modifier onlyBySomeoneIn(address[] _accounts)
  {
    bool pass = false;
    for (uint8 i = 0; i < _accounts.length; i++) {
      if (_accounts[i] == msg.sender) {
        pass = true;
      }
    }
    require(pass);
    _;
  }
  // Sets the worker, presumeably because they 'won' the bid
  function setWorker(address _worker)
    onlyBy(employer)
  {
    worker = _worker;
  }
  // Sets the reviewer, as finalization wasn't aggreed upon and
  // both Employer and Worker aggree that this party will properly
  // resolve the dispute.
  function addReviewer(address _reviewer)
    onlyByEither(employer, worker)
  {
    reviewers.push(_reviewer);
  }
  
  /*
  * Stage & Status Control
  */
  // Requires a function be called from certain stage
  modifier atStage(Stages _stage) {
    require(stage == _stage);
    _;
  }
  //Moves to the next stage of execution
  function nextStage() internal {
    stage = Stages(uint(stage) + 1);
  }
  //Moves back a stage
  function previousStage() internal {
    stage = Stages(uint(stage) - 1);
  }
  // Moves stage to review
  function moveToReview() internal {
    stage = Stages.UnderReview;
    status = Statuses.Disputed;
  }
  //Moves stage to finished
  function moveToFinished() internal {
    stage = Stages.Finished;
  }
  //Changes the status to param status
  function setStatus(Statuses _status) internal {
    status = _status;
  }

  /***
  * Stage AcceptingOffers
  ***/
  // Allows anyone to make an offer on the job
  function makeOffer(uint _price, uint _review_deposit, uint _duration)
    atStage(Stages.AcceptingOffers)
  {
    // Employer cannot bid on his own job
    require(msg.sender != employer);
    // Add a new work offer
    work_offers.push(workOffer({
      account: msg.sender,
      price: _price,
      review_deposit: _review_deposit,
      duration: _duration,
      offer_date: now,
      accept_date: 0
    }));
    NewOffer();
  }
  // Allows employer to accept an offer
  function acceptOffer(address _worker_address)
    onlyBy(employer)
    atStage(Stages.AcceptingOffers)
  {
    // Cannot accept more than one offer
    require( worker == 0 && accepted_offer.account == 0);
    // Accept the offer by updating accepted_offer and the current worker
    for (uint i = 0; i < work_offers.length; i ++) {
      workOffer memory offer = work_offers[i];
      if (offer.account == _worker_address) {
        offer.accept_date = now;
        accepted_offer = offer;
        worker = _worker_address;
        nextStage();
        OfferAccepted();
      }
    }
  }
  // Allows the employer to close the job
  function removeJob()
    onlyBy(employer)
    atStage(Stages.AcceptingOffers)
  {
    moveToFinished();
    setStatus(Statuses.Revoked);
    JobRemoved();
  }

  /***
  * Stage ReviewContract
  ***/
  // Allow a party to accept the current terms of the contract
  function accept_terms()
    onlyByEither(employer, worker)
    atStage(Stages.ReviewContract)
  {
    // Update term_acceptance
    if(msg.sender == employer) {
      contract_acceptance.employer = true;
      EmployerAcceptTerms();
    }else if (msg.sender == worker) {
      contract_acceptance.worker = true;
      WorkerAcceptTerms();
    }
    // If both parties agree, initate holding of funds
    if(contract_acceptance.employer && contract_acceptance.worker) {
     account_ballances["employer"] = 0;
     account_ballances["worker"] = 0;
     nextStage();
     TermsAccepted();
    }
  }
  // Allow a party to revoke the offer and re-open job bidding
  function revoke_offer()
    onlyByEither(employer, worker)
    atStage(Stages.ReviewContract)
  {
    delete worker;
    delete accepted_offer;
    contract_acceptance = termAcceptance({ employer: false, worker: false});
    previousStage();
    OfferRevoked();
  }

  /***
  * Stage GatheringDeposits
  ***/
  // This 
  // This ensures all conditions are met, and accepts the full agreed upon amount
  // of funds, as well as a deposit for review if required.
  function acceptDeposit()
    payable
    onlyBy(employer)
    atStage(Stages.GatheringDeposits)
    condition(msg.value == accepted_offer.price + accepted_offer.review_deposit)
  {
    // review_deposit is a percentage of the total work price that will be used to
    // settle disputes if required. If no dispute occurs, this is returned.
    account_ballances["employer"] = accepted_offer.review_deposit;
    account_ballances["worker"] = accepted_offer.price;
    nextStage();
    DepositConfirmed();
  }
  // If the employer decides at this point that he wants to exit, the contract should
  // be revoked and locked from all member interaction.
  function declineDeposit()
    onlyBy(employer)
    atStage(Stages.GatheringDeposits)
  {
    moveToFinished();
    setStatus(Statuses.Revoked);
    DepositFailed();
  }

  /***
  * Stage AwaitingJobCompletion
  ***/
  // Allow worker to submit work, which would be uploaded and stored off-chain. Only the
  // shasum is stored onchain to ensure the file isn't tampered with during a review.
  function submitWork(bytes32 _shasum, uint _fileNumber, string _filename)
    onlyBy(worker)
    atStage(Stages.AwaitingJobCompletion)
  {
    submitted_files[_fileNumber] = workFile({
      filename: _filename,
      shasum: _shasum,
      uploadTime: now
    });
    workSubmitted();
  }
  // Allow worker to signal that they are done working
  function jobComplete()
    onlyBy(worker)
    atStage(Stages.AwaitingJobCompletion)
  {
     nextStage();
     contractFinalizing();
  }
  // Allow employer to exit this stage, presumeably because a contract conditon
  // was broken, this will automatically move the contract into the review stage
  function terminateWork()
    onlyBy(employer)
    atStage(Stages.AwaitingJobCompletion)
  {
    moveToReview();
    workTerminated();
  }

  /***
  * Stage Finalize
  ***/
  // Allow a party to signal that they're happy with the work and are ready to move
  // the contract to finished
  function signalSatisfaction()
    onlyByEither(worker, employer)
    atStage(Stages.Finalize)
  {
    if(msg.sender == worker) {
      work_acceptance.worker = true;
    }else if (msg.sender == employer) {
      work_acceptance.employer = true;
    }
    if(work_acceptance.worker && work_acceptance.employer) {
      moveToFinished();
      setStatus(Statuses.Successful);
      contractFinalized();     
    }
  }
  // Allow a party to signal that they want an external review to resolve a conflict
  function requestReview()
    onlyByEither(worker, employer)
    atStage(Stages.Finalize)
  {
    nextStage();
    setStatus(Statuses.Disputed);
  }

  /***
  * Stage UnderReview
  ***/
  // Create a review contract
  // Somehow lock this contract in this stage until the review contract signals resolved


  /***
  * Stage Finished
  * This stage should be fully internal, handling distribution of funds currently locked into the
  * contract and then locking the contract in an un-accessable state of some sort.
  ***/
  // Contract finished without dispute, return the dispute portion to employer and pay full amount
  // to worker
  function successfulFinish() internal {
    uint employer_amount = account_ballances["employer"]*2;
    uint worker_amount = account_ballances["worker"]*2;
    account_ballances["employer"] = 0;
    account_ballances["worker"] = 0;
    employer.transfer(employer_amount/2);
    worker.transfer(worker_amount/2);
  }
  // If the contract was under dispute, payment must be split between
  // worker and all reviewers who participated
  function setteledFinish() internal
    condition(account_ballances["employer"] == accepted_offer.review_deposit)
  {
    // Calculate total amount to distribute amung reviewers
    uint worker_amount = account_ballances["worker"] - accepted_offer.review_deposit;
    uint reviewer_amount = account_ballances["employer"] + accepted_offer.review_deposit;
    reviewer_amount = reviewer_amount / reviewers.length;

    // Empty account_ballances
    account_ballances["worker"] = 0;
    account_ballances["employer"] = 0;

    // Transfer funds
    worker.transfer(worker_amount);
    for(uint i = 0; i < reviewers.length; i++) {
      reviewers[i].transfer(reviewer_amount);
    }

  }
  // Returns all funding to employer, empties all variables that may have been assigned to
  // in attempting to aggree upon contract terms
  function revokedFinish() internal
    condition(account_ballances["employer"] == accepted_offer.review_deposit + accepted_offer.price)
  {
    uint  amount = account_ballances["employer"] * 2;
    if (account_ballances["worker"] > 0) {
      amount += account_ballances["worker"]*2;
      account_ballances["worker"] = 0;
    }
    account_ballances["employer"] = 0; 
    employer.transfer(amount/2);
  }
  

  /*
  * Useful modifiers
  */
  modifier condition(bool _condition) {
    require(_condition);
    _;
  }

}
