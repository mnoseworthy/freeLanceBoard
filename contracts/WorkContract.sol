pragma solidity ^0.4.2;

contract WorkContract {
  /*
  * Construction Fields
  */
  // Contract Contributers
  address public employer = msg.sender;
  address public worker;
  address[] public reviewer;

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
    Disputing
  }

  /// Typedefs
  struct workOffer{
    uint account;
    uint price;
    uint duration;
    uint offer_date;
    uint accept_date;
  }
  struct termAcceptance{
    bool employer;
    bool worker;
  }

  // Contract Data
  uint public creationTime = now;
  Stages public stage = Stages.AcceptingOffers;
  Statuses public status = Statuses.Active;

  workOffer[] public work_offers;
  workOffer public accepted_offer;

  termAcceptance public term_acceptance = termAcceptance({ employer: false, worker: false});

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
    pass = false;
    for (i = 0; i < _accounts.length(); i++){
      if (_accounts[i] == msg.sender){
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
  * Stage Control
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
  //Moves stage to finished
  function moveToFinished() internal {
    stage = Statuses.Finished;
  }

  /***
  * Stage AcceptingOffers
  ***/
  // Allows anyone to make an offer on the job
  function makeOffer(uint _price, uint _duration)
    atStage(Stages.AcceptingOffers)
  {
    // Employer cannot bid on his own job
    require(msg.sender != employer)
    // Add a new work offer
    work_offers.push(workOffer({
      account: msg.sender,
      price: _price,
      duration: _duration,
      offer_date: now
    }));
    NewOffer();
  }
  // Allows employer to accept an offer
  function acceptOffer(address _worker_address)
    onlyBy(employer)
    atStage(Stages.AcceptingOffers)
  {
    // Cannot accept more than one offer
    require( !worker && !accepted_offer);
    // Accept the offer by updating accepted_offer and the current worker
    for (offer in work_offers){
      if (offer.account == _worker_address){
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
    status = Statuses.Revoked;
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
    if(msg.sender == employer){
      term_acceptance.employer = true;
      EmployerAcceptTerms();
    }else if (msg.sender == worker){
      term_acceptance.worker = true;
      WorkerAcceptTerms();
    }
    // If both parties agree, initate holding of funds
    if(term_acceptance.employer && term_acceptance.worker){
     nextStage()
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
    term_acceptance = termAcceptance({ employer: false, worker: false});
    previousStage();
    OfferRevoked();
  }

  /***
  * Stage GatheringDeposits
  ***/
  // This 
  // This ensures all conditions are met, and accepts the full agreed upon amount
  // of funds.
  function acceptDeposit()
    payable
    onlyBy(employer)
    atStage(Stages.GatheringDeposits)
    condition(msg.value == accepted_offer.price)
  {
    nextStage();
    DepositConfirmed();
  }
  
  /*
  * Useful modifiers
  */
  modifier condition(bool _condition) {
    require(_condition);
    _;
  }

}
