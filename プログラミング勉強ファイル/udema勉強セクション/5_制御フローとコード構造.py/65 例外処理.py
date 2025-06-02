l = [1,2,3]
i = 5

try:
    l[i]
except:
    print("Don't worry")
else:
    print('done')
finally:
    print('clean up')
#exceptはこの後の処理を行わないので注意する

#インデックスエラーの時に次のコードの実行をすることができるコードがある
#except indexError:　を使う
#finally　は必ず最後に実行する
#else　は成功したときに処理を行える
