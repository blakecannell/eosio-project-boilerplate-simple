/**
 *  @file
 *  @copyright straas
 */
#include <eosiolib/eosio.hpp>

class straas : public eosio::contract {
    public:
        using contract::contract;
    public:
      /// @abi table
      struct alloweduser {
          account_name username;
          auto primary_key() const { return username; };
          EOSLIB_SERIALIZE( alloweduser, (username))
      };

      typedef eosio::multi_index<N(alloweduser), alloweduser> m_alloweduser_table;

      m_alloweduser_table m_allowedusers;

      /// @abi table
      struct proposal {
        proposal() { isclosed = false; };
        uint64_t              key;
        account_name          author;
        std::string           title;
        std::string           documenthash;
        uint8_t               isclosed; // 1 = Yes, 0 = No
        uint8_t               result;  // 1 = Yes, 0 = No, 2 = tied
        auto primary_key() const { return key; };
        EOSLIB_SERIALIZE( proposal, (key)(author)(title)(documenthash)(isclosed))
      };

      typedef eosio::multi_index<N(proposal), proposal> m_proposal_table;

      m_proposal_table m_proposals;

      /// @abi table
      struct vote {
        uint64_t              key;
        uint64_t              proposal; // A foreign key into the proposal table
        account_name          voter;
        uint8_t               vote_value; // 1= Yes, 0 = No
        auto primary_key() const { return key; };
        uint64_t by_proposal() const { return proposal; };
        EOSLIB_SERIALIZE( vote, (key)(proposal)(voter)(vote_value))
      };

      typedef eosio::multi_index<N(vote), vote,
        eosio::indexed_by<N(proposal), eosio::const_mem_fun<vote, uint64_t, &vote::by_proposal>>> m_vote_table;

      m_vote_table m_votes;

      /// @abi action
      /// Create a proposal
      void createprop(const account_name& user, const std::string& title,
                          const std::string& documenthash);

      /// @abi action
      /// Cast a vote on a proposal
      void castvote(const account_name& user, uint64_t proposal, uint8_t vote);

      /// @abi action
      /// Add a user to the allowed list - Cleos only not required for web frontend
      void addalloweduser(const account_name& newuser);

      /// @abi action
      /// Remove a user from the allowed list - Cleos only not required for web frontend
      void removealloweduser(const account_name& deleteduser);

      /// @abi action
      /// Delete all of the data from all tables - Cleos only not required for web frontend
     void deleteeverything(const account_name& systemadmin);

   public:
         straas( account_name self ):contract(self), m_allowedusers(self, self), m_proposals(self, self), m_votes(self, self){};
};

// specify the contract name, and export a public action: update
EOSIO_ABI( straas, (createprop)(castvote)(addalloweduser)(removealloweduser)(deleteeverything) )
