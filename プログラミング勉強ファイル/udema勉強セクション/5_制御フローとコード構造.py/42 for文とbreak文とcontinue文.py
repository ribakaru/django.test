some_list = [1,2,3,4,5]

i = 0
while i <len(some_list):
    print(some_list[i])
    i += 1

for i in some_list:
    print(i)
#forを使う場合はこのようにする

for s in 'abcde':
    print(s)

for word in ['my','name','is','mike']:
    if word == 'name':
        break
    print(word)
