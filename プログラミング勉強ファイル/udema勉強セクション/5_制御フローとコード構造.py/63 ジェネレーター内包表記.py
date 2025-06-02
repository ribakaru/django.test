""" def g():
    for i in range(10):
        yield i

g = g()
print(type(g))
print(next(g)) """

#内包表記のやり方
def g():
    for i in range(10):
        yield i

g = g()

g = (i for i in range(10) if i % 2 == 0)

for x in g:
    print(x)

#タプルは宣言が必要なので注意する

