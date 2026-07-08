# Bamboom (SPE+ASW+DS)

## Project Proposal

- Bamboom: a card game inspired by Exploding Kittens, panda-themed.

The same project will be developed and used for the courses of
Distributed Systems and Applicazioni e Servizi Web.

## Group Members

- Manuel Julio Montesinos - juliomanuel.buizo@studio.unibo.it
- Matteo Violani - matteo.violani@studio.unibo.it

## Project Scenario

The project consists in the development of Bamboom, a gaming platform inspired by the card game
Exploding Kittens, reimagined with a panda theme. The platform requires user registration.
Users will be able to build friendships with other users and compose decks using the base sets
and expansions already available in the game, or from previously created custom decks.
A user can join matches and lobbies, waiting until the required number of players is reached.
New matches can be created by configuring the deck to use, the number of additional bombs and
defuses, and other parameters such as the turn duration.
When creating a match, friends can join the lobby via invitation in a private waiting room,
before the match becomes visible to all other users.
The user can choose to participate in a match either as a player or as an observer.
During the match, each player will see their own hand and can play cards according to the rules;
players can interact with each other through reactions. At the end of the match, a match
history will be available.
The cards, decks, and expansions available in Bamboom will be managed by an administrator user,
who will be able to create and publish them.

## Domain Requirements

Platform users:

**Admin**: user who manages and monitors the Bamboom platform.
- Can create drafts and publish cards, decks, and game expansions.
- Can view gameplay statistics for all players.
- Can monitor the status of all platform microservices.

**User**: player who registers and plays on the Bamboom platform.
- Account creation and management, including friendship relations with other players.
- Creation and management of custom decks using the cards available in the game.
- Management of public and private lobbies and ongoing matches.
- Playing cards according to the rules and using reactions to interact during a match.
- Viewing statistics, progress, and achievements/badges.

**Optional Requirements (User)**:
- Replay of recently played matches.

## Technological Requirements

- Microservices architecture.
- Use of the MEVN stack to develop part of the system to meet the requirements of the ASW course.
