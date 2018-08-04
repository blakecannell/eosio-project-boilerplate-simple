#include <eosiolib/eosio.hpp>
#include "straas.h"

void straas::createprop(const account_name& user, const std::string& title,
                            const std::string& documenthash)
{
  require_auth(user);

  m_proposals.emplace(get_self(), [&](auto& p) {
    p.key = m_proposals.available_primary_key();
    p.author = user;
    p.title = title;
    p.documenthash = documenthash;
    p.isclosed = 0;
    p.result = 0;
  });

}

void straas::castvote(const account_name& user, uint64_t proposal, uint8_t vote)
{
   require_auth(user);
   eosio_assert(vote == 1 || vote == 0, "Allowed votes are only 1 for Yes or "
                                        "0 for No");

   uint8_t ui_User_Count = 0;

   // Count the number of users
   for(auto& item : m_allowedusers)
   {
     ui_User_Count++;
   }

   m_vote_table votes(_self, _self);  // code, scope
   auto proposal_index = votes.get_index<N(proposal)>();

   auto matchingItem = proposal_index.lower_bound(proposal);

   // Iterate over the already cast votes, check that the user hasn't voted
   // Also check the number of votes and the number of yes and no votes.

   uint32_t ui_Votes_Cast = 0;
   uint32_t ui_Yes_Votes = 0;
   uint32_t ui_No_Votes = 0;

   while (matchingItem != proposal_index.end() && matchingItem->proposal == proposal) {
     eosio_assert(matchingItem->voter != user, "User has already voted");
     ui_Votes_Cast++;
     if (matchingItem->vote_value == 1) {
       ui_Yes_Votes++;
     }
     if (matchingItem->vote_value == 0) {
       ui_No_Votes++;
     }
   }

   m_votes.emplace(get_self(), [&](auto& p) {
     p.key = m_proposals.available_primary_key();
     p.proposal = proposal;
     p.voter = user;
     p.vote_value = vote;
   });

   if (vote == 1) {
     ui_Yes_Votes++;
   }
   if (vote == 0) {
     ui_No_Votes++;
   }
   if (ui_Votes_Cast + 1 == ui_User_Count) {
     // Everyone has voted store the result in proposal table
     auto proposal_rec = m_proposals.find(proposal);
     uint8_t result;
     if (ui_Yes_Votes == ui_No_Votes) {
       result = 2;
     } else if (ui_Yes_Votes > ui_No_Votes) {
       result = 1;
     } else if (ui_Yes_Votes < ui_No_Votes) {
       result = 0;
     }
     m_proposals.modify(proposal_rec, get_self(), [&]( auto& p){
       p.result = result;
       p.isclosed = 1;
     });

   }
}

void straas::addalloweduser(const account_name& newuser)
{
  require_auth(get_self());

  auto itr = m_allowedusers.find(newuser);
  eosio_assert(itr == m_allowedusers.end(), "That user has access to straas, can't add");
  m_allowedusers.emplace(get_self(), [&](auto& p) {
    p.username = newuser;
  });
}

void straas::removealloweduser(const account_name& newuser)
{
  require_auth(get_self());

  auto itr = m_allowedusers.find(newuser);
  eosio_assert(itr != m_allowedusers.end(), "That user doesn't have access to straas, can't remove");
  m_allowedusers.erase(itr);
}

void straas::deleteeverything(const account_name& systemadmin)
{
  require_auth(get_self());

  std::vector<uint64_t> keysForDeletionFromAuthorisedUsers;
  for(auto& item : m_allowedusers)
  {
    keysForDeletionFromAuthorisedUsers.push_back(item.primary_key());
  }

  for (uint64_t key : keysForDeletionFromAuthorisedUsers)
  {
      auto itr = m_allowedusers.find(key);
      if (itr != m_allowedusers.end())
      {
        m_allowedusers.erase(itr);
      }
  }

  std::vector<uint64_t> keysForDeletionFromProposals;
  for(auto& item : m_proposals)
  {
    keysForDeletionFromProposals.push_back(item.primary_key());
  }

  for (uint64_t key : keysForDeletionFromProposals)
  {
      auto itr = m_proposals.find(key);
      if (itr != m_proposals.end())
      {
        m_proposals.erase(itr);
      }
  }

  std::vector<uint64_t> keysForDeletionFromVotes;
  for(auto& item : m_votes)
  {
    keysForDeletionFromVotes.push_back(item.primary_key());
  }

  for (uint64_t key : keysForDeletionFromVotes)
  {
      auto itr = m_votes.find(key);
      if (itr != m_votes.end())
      {
        m_votes.erase(itr);
      }
  }


}
