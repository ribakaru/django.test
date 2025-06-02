w = ['mon','tue','wed']
f = ['coffee','milk','water']

d = {}
for x , y in zip(w, f):
    d[x] = y

print(d)

#辞書の包括表記のやり方、4～6行目を変える
d = {x:y for x,y in zip(w,f)}
print(d)

