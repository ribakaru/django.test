#ジェネレーターはiteratorの要素
#ジェネレーターは1要素を取り出してそれを生成していくという風にやっていく

""" l = ['Good morning','Good afternoon','Good night']

for i in l:
    print(i)

def greeting():
    yield 'Good morning'
    yield 'Good afternoon'
    yield 'Good night'

for g in greeting():
    print(g)

g = greeting()
print(next(g))
print(66666666666666666666)
print(next(g))
print(66666666666666666666)
print(next(g)) """


def counter(num=10):
    for _ in range(num):
        yield 'run'

def greeting():
    yield 'Good morning'
    yield 'Good afternoon'
    yield 'Good night'

g = greeting()
c = counter()

print(next(g))

print(next(c))
print(next(c))
print(next(c))
print(next(c))

print(next(g))

print(next(c))
print(next(c))
print(next(c))
print(next(c))

print(next(g))