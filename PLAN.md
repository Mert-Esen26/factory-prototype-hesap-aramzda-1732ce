# Plan

## Donmuş kapsam

Grup oluştur → harcama ekle (ödeyen/tutar) → borç özetini ve geçmişi gör. En fazla üç temel özellik; kimlik doğrulama, backend veritabanı ve canlı ortak düzenleme kapsam dışı.

## Mimari

Node 24 `node:http` statik sunucu, Vanilla JS arayüzü, `src/settlement.js` saf hesaplama modülü ve tarayıcı LocalStorage. Sunucu tarafında kullanıcı verisi tutulmaz.

## Kabul ölçütleri

1. Toplam tutar katılımcı sayısına eşit bölünür ve ödeyen mahsuplaştırılır.
2. LocalStorage sayfa yenilemesinden sonra grup ve harcamaları korur.
