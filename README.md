# youtube-dislike

A simple app written in React.js that shows dislikes (also likes) in youtube video.
![Zrzut ekranu 2022-05-10 o 10 36 18](https://user-images.githubusercontent.com/1592053/167588242-21453616-5fda-47a0-bfbc-c3645b02e8ee.png)

# How to install?
Add Google API v3 key in `/src/config.json`:
```json
{
  "GOOGLE_YOUTUBE_API_KEY": "api-key"
}
```

Instructions how to obtain API key: [https://developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started)

Note: Youtube API is used only for video title, comments count, date added.

Then:

```
$ npm install
```

Development:
```
$ npm start
```

Production:
```
$ npm run build
```

Then copy contents of `/build` folder to server.
