# QA kanıtı — 2026-11-10

| ID | Kabul ölçütü | Sonuç | Kanıt |
|---|---|---|---|
| K01 | 300 TL / 3 kişi ve çoklu harcama için doğru net denge | GEÇTİ | `npm test`: 2 gerçek Node testinin 2'si geçti |
| K02 | Tarayıcı yenilemesinde LocalStorage ile verinin korunması | DOĞRULANMADI | Uygulama LocalStorage yazma/okuma kodunu içeriyor; bu turda bağlı tarayıcıda manuel yenileme testi çalıştırılmadı |
| K03 | Uygulama statik ana sayfayı sunar | GEÇTİ | `npm start` + `curl http://127.0.0.1:3000/`: HTTP 200 ve Türkçe prototip metni |
| K04 | Gerekli dosyalar build kontrolünden geçer | GEÇTİ | `npm run build`: temel dosyalar mevcut |

## Açık doğrulama sınırı

390 px ve 1440 px görsel incelemesi bu çalışma ortamında bağlı tarayıcı olmadan yapılmadı. Bu nedenle teslim üretim kalite doğrulaması değil, otomatik olarak doğrulanmış BASIC PROTOTYPE'tir.
