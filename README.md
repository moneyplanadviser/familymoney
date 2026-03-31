# FamilyMoney

家計・相続・教育費をわかりやすくシミュレーションする無料ツール集です。

## 提供ツール

| ツール | 説明 |
|--------|------|
| [家計シミュレーター](kakei.html) | 40代・晩産夫婦向け。毎月の家計から「いま」と「30年先」のイメージをざっくり確認。貯蓄診断と青木家モデル比較。 |
| [相続税シミュレーター](souzokuzei.html) | 相続税を3ステップでシミュレーション。課税価格・相続税総額・各人の税額を自動計算。 |
| [教育費シミュレーター](kyouikushikin.html) | 進路別に教育資金を試算。幼稚園〜大学まで公立・私立の選択で総額を自動計算。 |
| [年金シミュレーター](nenkin.html) | 繰り下げによる増額（0.7%/月）を加味して、老後の収支を簡単にシミュレーション。 |
| [家計個別相談 初回ヒアリングシート](初回ヒアリングシート_家計相談.html) | 初回相談前にご記入いただくシート。Formspreeでメール受信可能。 |
| [わが家のお金の価値観ミニ取説](wagaie-torisetsu.html) | お金の話を責め合わずに始めるための1枚。プレビューを画像でダウンロード可能。 |

## ヒアリングシートのFormspree設定

1. [formspree.io](https://formspree.io) でアカウント作成
2. 「New Form」で新規フォームを作成
3. 表示されるフォームID（例：`xyzabcde`）をコピー
4. `初回ヒアリングシート_家計相談.html` を開き、`YOUR_FORM_ID` をフォームIDに置き換え
5. フォームで指定したメールアドレスに回答が届きます
6. Formspreeの「Select columns to display」で「送信内容（全文）」を追加すると、全項目を一覧で確認できます

## 公開方法（GitHub Pages）

1. リポジトリの **Settings** → **Pages** を開く
2. **Source** で「Deploy from a branch」を選択
3. **Branch** で `main`、**Folder** で `/ (root)` を選択
4. 保存すると数分で公開されます

**公開URL**: `https://moneyplanadviser.github.io/familymoney/`

**プロフィール用リンク一覧（Linktree 風）**: [links.html](https://moneyplanadviser.github.io/familymoney/links.html)（`main` にマージされ GitHub Pages が更新されると表示されます）

## ローカルで確認

```bash
# 簡易HTTPサーバーで確認（Python 3）
python3 -m http.server 8000
# http://localhost:8000 でアクセス
```

## 会員限定サイト（プロトタイプ）

有料会員向けの掲示板・ブログ等の検証用として、`member-site/` に **Next.js + PostgreSQL** のプロトタイプを置いています。

- **トップページ（`index.html`）** から [Vercel でデプロイ](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoneyplanadviser%2Ffamilymoney&root-directory=member-site) への導線と、ドキュメントへのリンクがあります。
- ローカル起動・本番の環境変数は [member-site/README.md](member-site/README.md) を参照してください。

## ライセンス

