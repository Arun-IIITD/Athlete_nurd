# ScoutIQ — Athlete Discovery App

This is a simple React Native (Expo) app where scouts can:
-- browse athletes
-- check their profile
-- add/remove them from shortlist

I focused more on making things work properly instead of over-designing.

# 🚀 How to run
git clone <your-repo-url>
cd scoutiq
npm install
npx expo start

Then scan QR with Expo Go (Android).

# 📁 Repo structure
src/
  components/   → cards, bars, small UI parts
  screens/      → main screens
  navigation/   → tab + stack setup
  context/      → shortlist logic + storage
  data/         → mock athletes


# ✅ What I built
Athlete list (FlatList)
Filter by sport
Search by name (with debounce)
Profile screen with stats
Add/remove shortlist
Shortlist saved using AsyncStorage
Total count + avg score
Empty states handled properly


# 🧠 Decisions / Assumptions
I kept all stats in 0–100 range to keep things simple
Score is just average of stats, didn’t overcomplicate it
Search only works on name, not everything
Shortlist is stored locally
Used FlatList 
UI is kept simple


My main focus was to make core features work cleanly. If I had more time I would add compare feature (2 players side by side).
Right now you have to go back and forth, which is not ideal.



# AI usage
Used AI mainly for:
-- fixing setup issues (Expo errors)
-- speeding up some structure



# Testing
-- Tested on Android (Expo Go)

# Final
I didn’t try to make it fancy.
Just focused on making it clean and working properly.