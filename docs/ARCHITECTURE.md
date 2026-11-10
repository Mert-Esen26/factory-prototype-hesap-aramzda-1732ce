# Mimari

Tarayıcı arayüzü `public/` altında; hesaplama saf fonksiyon olarak `src/settlement.js` içindedir. `server.js` yalnızca statik dosya servisi yapar. Durum modeli `{ groupName, members[], expenses[] }` biçiminde LocalStorage'da tutulur. Dış API, kimlik doğrulama ve runtime secret yoktur.
