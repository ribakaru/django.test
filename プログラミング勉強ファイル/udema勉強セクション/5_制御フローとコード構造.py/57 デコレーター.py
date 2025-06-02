""" #ファンクションを実行する前に何かやりたい時にデコレーターを使う
def print_info(func):
    def wrapper(*args,**kwargs):
        print('start')
        result = func(*args,**kwargs)
        print('end')
        return result
    return wrapper

def add_num(a,b):
    return a + b

f = print_info(add_num)
r = f(10,20)
print(r) 


print('start')
r = add_num(10,20)
print('end')

print(r)


#デコレーターのやり方(13～15迄を変える)
@print_info
def add_num(a,b):
    return a + b

r = add_num(10,20)
print(r)
#違うファンクションが出てきてもデコレーターを使えば実装することができる

"""

def print_more(func):
    def wrapper(*args,**kwargs):
        print('func:',func.__name__)
        print('args:',args)
        print('kwargs:',kwargs)
        result = func(*args,**kwargs)
        print('result:',result)
        return result
    return wrapper

def print_info(func):
    def wrapper(*args,**kwargs):
        print('start')
        result = func(*args,**kwargs)
        print('end')
        return result
    return wrapper

@print_info
@print_more
def add_num(a,b):
    return a + b

r = add_num(10,20)
print(r)
#順序も大切である、