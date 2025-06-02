days = ['mon','tue','wed']
fruits = ['apple','banana','orange']
drinks = ['coffee','tea','beer']

for i in range(len(days)):
    print(days[i],fruits[i],drinks[i])

#上のと同じ結果になる文
for day, fruit,drink in zip(days,fruits,drinks):
    print(day,fruit,drink)
