#def menu(**kwargs):
#    for k,v in kwargs.items():
#        print(k,v)

#d = {
#    'entree':'beer',
#    'dirnk':'ice coffee',
#    'dessert': 'ice' 
#}

#menu(**d)

#アスタリスク2つで辞書型を使うことは結構なるので覚えておく

#タプル化と辞書化をまとめてできる

def menu(food, *args, **kwargs):
    print(food)
    print(args)
    print(kwargs)

menu('banana','apple','erange',entree='beer',drink='coffee')

#順序が大切になるので注意する、