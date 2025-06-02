"""def outer(a,b):

    def inner():
        return a+b
    
    return inner

f = outer(1,2) 
r = f()
print(r)
"""
#innerはファンクションを実行するしないと出力されない
#今実行したくないものなどで後で実行するときにクロージャーを使う

def circle_area_func(pi):
    def circle_area(radius):
        return pi * radius * radius
    
    return circle_area

ca1 = circle_area_func(3.14)
ca2 = circle_area_func(3.14592)

print(ca1(10))
print(ca2(10))

#初めに設定した引数を元に用途によって使い分ける時に使うことを覚えておく
