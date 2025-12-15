import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 開発サーバーのポートを3000に固定（お好みで変更可）
    open: true, // サーバー起動時に自動でブラウザを開く
  },
})
