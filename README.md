# Hesap Aramızda — PROTOTYPE

**Durum:** `PROTOTYPE` (BASIC PROTOTYPE)

Arkadaş gruplarında ortak harcamaları hızlıca bölmek için Türkçe, tarayıcı tabanlı BASIC PROTOTYPE. Grup oluşturun, ödeyen ve tutarıyla harcama ekleyin; kişi bazlı net borç/alacak özetini görün.

## Başlatma

Node 24+ gerektirir. Proje klasöründe:

```bash
npm test
npm run build
npm start
```

Sonra `http://localhost:3000` adresini açın. Bağımlılık yoktur; sunucu yalnızca statik dosyaları servis eder. Veriler tarayıcının LocalStorage alanında saklanır.

## Kapsam

- Hızlı harcama ekleme formu
- Eşit paylaştırma ile kişi bazlı borç-alacak dengesi
- Basit harcama geçmişi

Bu bir PROTOTİP'tir; üretim ürünü veya gerçek zamanlı ortak çalışma hizmeti değildir.


<!-- factory-windows-launchers -->
## Windows hızlı başlatma

1. Bir kere [Node.js 24 LTS](https://nodejs.org) kurun.
2. Proje ZIP dosyasını klasöre çıkarın; `install.bat` dosyasını çift tıklayın.
3. `baslat.bat` dosyasını çift tıklayın ve konsoldaki localhost adresini açın.

`baslat.bat` eksik/değişen bağımlılıkları otomatik kurar. İnternet ilk kurulumda gerekir. `.env.example` varsa `.env` yalnızca eksik olduğunda oluşturulur; gereken ayarları düzenleyin. Konsolu açık tutun; durdurmak için Ctrl+C kullanın.
