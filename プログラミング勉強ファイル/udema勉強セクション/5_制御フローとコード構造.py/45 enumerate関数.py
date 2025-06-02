#enumerale関数

i = 0
for fruit in ['apple','banana','orange']:
    print(i, fruit)
    i += 1

#上と同じ出力になる例
for  i,fruit in enumerate(['apple','banana','orange']):
    print(i,fruit)

