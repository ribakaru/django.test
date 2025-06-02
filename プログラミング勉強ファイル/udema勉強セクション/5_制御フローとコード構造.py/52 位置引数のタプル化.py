""" def say_something(word,*args):
    print('word =',word)
    for arg in args:
        print(arg)

say_something('Hi','Mike','Nance')
"""
#アスタリスクを使うことでまとめて出力できる、引数を何回も使うことができる

def say_something(word,*args):
    print('word =',word)
    for arg in args:
        print(arg)

t = ('Mike','Nancy')
say_something('Hi',*t)
#でも可
