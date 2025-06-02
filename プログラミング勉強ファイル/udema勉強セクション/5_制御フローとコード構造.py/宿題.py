""" 定食のオーダーを取るロボットを作成します。
オーダーを全て聞いた後には「合計金額」と「提供までにかかる時間」を出力してください。（メニューに存在しない定食名を入力された場合には「注文可能なメニューを入力してください。」と出力してください。）
・メニュー
　・A定食
　　・金額：1000円
　　・提供時間：10分
　・B定食
　　・金額：1200円
　　・提供時間：15分
　・C定食
　　・金額：1500円
　　・提供時間：20分 """



count1 = 0
count2 = 0
count3 = 0

while True:
    word = input('メニューを入力してください。')
    if word == 'finish':
        break
    elif word == 'A定食':
        count1 = count1 +1
    elif word == 'B定食':
        count2 = count2 +1
    elif word == 'C定食':
        count3 = count3 +1
    else :
        print('注文可能なメニューを入力してください。')

print("合計金額は",(count1*1000+count2*1200+count3*1500),"円です。")
print('提供までにかかる時間は',(count1*10+count2*15+count3*20),'分です。')



#例　答え
menu_detail = {
    "A定食": {
        "price": 1000 ,
        "serve_time": 10
    },
    "B定食": { 
        "price": 1200 ,
        "serve_time": 15
    },
    "C定食": {
        "price": 1500 ,
        "serve_time": 20
    }
}

menu = []
for k,_ in menu_detail.items():
    menu.append(k)

totol_price = 0
totol_time = 0

while True:
    word = input('メニューを入力してください。')
    if word == 'finish':
        print("合計金額は",totol_price,"です。"
            "提供までにかかる時間は",totol_time,"です.")
        break
    
    if word not in menu:
        print('注文可能なメニューを入力してください。')
        continue
    
    totol_price += menu_detail[word]["price"]
    totol_time += menu_detail[word]["serve_time"] 

