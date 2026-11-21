# Ella's Word Den

A unicorn-themed picture word app for Ella (5) to learn **Svenska**, **English** and **中文**. It's a web page with no build step and no dependencies. Every picture is hand-drawn in code (`art.js`), so there are no emoji.

Live at https://gylleann-nl.github.io/ella-word-den/

## What's inside

- **Language switch:** on the home screen and in Words. Pick 中文, Svenska or English to practise one language, or Mix to get all three (Mix in games is about half Chinese).
- **Words:** 14 picture decks, about 165 words, grouped into categories:
  - Yummy food: fruit, food, Singapore food (chicken rice, satay, mooncake...)
  - Animals and nature: animals, outside
  - Me and my family: my body, people (including mormor, morfar, farmor, farfar)
  - School and Singapore: school, around Singapore (MRT, otter, red packet...)
  - Sweden: in Sweden (fika, midsommar, sommarstuga...), winter and Christmas (pulka, tomten, pepparkaka...)
  - Colours and numbers
  - Chinese characters: picture characters like 日 月 山 水
- **Listen & find:** hear a word, tap the right picture. Play one deck, a whole category, or everything. After two wrong taps the word is said in Swedish as a hint, then in Chinese again.
- **Say it:** hear the word, record yourself saying it, then hear yourself and the model.
- **Colouring:** pick a picture, hear its name, then colour it in. Tapping a colour says the colour's name, so she learns colours too. Magic fills in the real colours, and pictures are remembered.
- **Phonics (English):** letter sounds, blending (c · a · t → cat), reading words under a picture, and tricky words (the, is, said...).
- **Daily streak and Reward Jar hearts:** every 10 words she gets right (in any game, or a finished colouring) earns a heart for her Reward Jar, up to 1 a day. The home screen shows her streak, today's progress and the last 7 days. In Grown-ups you see how many hearts to add to the Reward Jar in the Savings Tracker, and tap a button once you've added them.
- **Stickers:** every 5 stars unlocks a new sticker, unicorns first.
- **Grown-ups** (press and hold): progress per language, settings, and **record your own voice** for any word or letter sound. Recordings stay on the device and are used instead of the device voice.

Words she finds harder come up more often in the games.

## Adding a picture

Open `art.js` and add a drawing to `ART`, on a 100 × 100 grid. Then use its name as the picture of a word in `index.html`.

## Tips

- The device voice for Chinese and Swedish depends on the phone or tablet. On iPad, install better voices under Settings → Accessibility → Spoken Content → Voices.
- Single letter sounds from the device voice are rough. Recording your own in Grown-ups makes phonics much better.
