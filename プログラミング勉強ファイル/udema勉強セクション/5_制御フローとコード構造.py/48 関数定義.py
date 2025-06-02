#def 定義するという意味
def say_something():
    print('hi')

say_something()
#pythonは上から処理するため、関数定義をしてから呼び出す流れになる

#返り値について
def say_something():
    s = 'hi'
    return s

result = say_something()
print(result)

#引数

def what_is_this(color):
    if color == 'red':
        return 'tomato'
    elif color == 'green':
        return 'green pepper'
    else:
        return"I don' know"

result = what_is_this('red')
print(result)


