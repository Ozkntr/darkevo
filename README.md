# Darkevo

Darkevo resmi oyun sitesi. Next.js, Türkçe / İngilizce / Almanca dil desteği.

## Geliştirme

```bash
npm install
npx prisma db push
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

- Dil menüsü (`TR / EN / DE`) seçimi `localStorage` içinde saklanır (`darkevo-locale`).
- Discord ve launcher adresleri `src/lib/site-links.ts` içinden veya ortam değişkenlerinden değişir:
  - `NEXT_PUBLIC_DISCORD_URL`
  - `NEXT_PUBLIC_LAUNCHER_URL`
- Kayıt: `/oyna` · Giriş: `/giris` · Destek talebi: `/destek/talep` (giriş gerekir).
