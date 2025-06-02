#1〜100までの数字を順番に出力してください。
# ただし、3の倍数の数字を出力する時にはFizz
# 5の倍数の数字を出力する時にはBuzz
# 15の倍数を出力する時にはFizzBuzz
# を出力してください。

""" count = 1
while count < 101:
    if count % 3  == 0:
        print('Fizz')
        count += 1
    elif count % 5 == 0:
        print('BUzz')
        count = count+1
    elif count % 15 == 0:
        print('izzBuzz')
        count += 1
    else:
        print(count)
        count += 1 """
    
count = 1
while count < 101:
    if count % 15 == 0:
        print('izzBuzz')
    elif count % 5 == 0:
        print('BUzz')
    elif count % 3  == 0:
        print('Fizz')
    else:
        print(count)
    count += 1

for i in range(1, 101):
    s = ""
    if i % 3 == 0:
        s = "Fizz"
    if i % 5 == 0:
        s += "Buzz"
    if s == "":
        s = i
    print(s)

#fizzbuzz問題