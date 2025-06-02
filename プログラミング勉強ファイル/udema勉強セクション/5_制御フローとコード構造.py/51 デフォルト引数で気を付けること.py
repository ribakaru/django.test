""" def test_func(x,l=[]):
    l.append(x)
    return l
"""
""" y = [1,2,3]
r = test_func(100,y)
print(r)


y = [1,2,3]
r = test_func(200,y)
print(r)
"""

""" r = test_func(100)
print(r)

r = test_func(100)
print(r) """
#バグにつながる
#空のリストが一度だけ生成されるが2度目は先頭のリストを参照されるので注意する
#参照渡しのものを残しておくとバグにつながりやすい

def test_func(x, l=None):
    if l is None:
        l = []
    l.append(x)
    return l

r = test_func(100)
print(r)

r = test_func(100)
print(r)
#このようにすると良い
