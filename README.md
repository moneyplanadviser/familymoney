# FamilyMoney

家計・相続・教育費をわかりやすくシミュレーションする無料ツール集です。

## 提供ツール

| ツール | 説明 |
|--------|------|
| [家計シミュレーター](kakei.html) | 40代・晩産夫婦向け。毎月の家計から「いま」と「30年先」のイメージをざっくり確認。貯蓄診断と青木家モデル比較。 |
| [相続税シミュレーター](souzokuzei.html) | 相続税を3ステップでシミュレーション。課税価格・相続税総額・各人の税額を自動計算。 |
| [教育費シミュレーター](kyouikushikin.html) | 進路別に教育資金を試算。幼稚園〜大学まで公立・私立の選択で総額を自動計算。 |

## 公開方法（GitHub Pages）

1. リポジトリの **Settings** → **Pages** を開く
2. **Source** で「Deploy from a branch」を選択
3. **Branch** で `main`、**Folder** で `/ (root)` を選択
4. 保存すると数分で公開されます

**公開URL**: `https://moneyplanadviser.github.io/familymoney/`

## ローカルで確認

```bash
# 簡易HTTPサーバーで確認（Python 3）
python3 -m http.server 8000
# http://localhost:8000 でアクセス
```

## ライセンス

