animal = 'cat'

def f():
    animal = 'dog'
    print('local:',locals())

f()
print('global:' , globals())

#メインscriptが実行される
