def menu(entree,drink,dessert):
    print(entree)
    print(drink)
    print(dessert)

menu('beef','beer','ice')
#順番を間違えて打ったらそのままで出力させるので注意

#間違えないようにするには
menu(entree='beef',dessert='ice',drink='beer')
#このようにすると順番が違っても出力されるものは変わらない、キーワードを指定することで間違えが減る
#10行目の順序を変えるとエラーになるので注意する

#デフォルト引数について
def munu(entree='beaf',drink='wine',dessert='ice'):
    print('entree = ',entree)
    print('drink = ',drink)
    print('dessert = ',dessert)

menu(entree='chicken')
