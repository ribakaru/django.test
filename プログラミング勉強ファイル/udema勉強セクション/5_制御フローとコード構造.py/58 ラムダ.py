""" l = ['Mon','tue','Wed','Thu','fri','sat','Sun']

def change_words(words,func):
    for word in words:
        print(func(word))

def sample_func(word):
    return word.capitalize()

change_words(l,sample_func) """

#上のものを簡単にする方法

l = ['Mon','tue','Wed','Thu','fri','sat','Sun']

def change_words(words,func):
    for word in words:
        print(func(word))

sample_func = lambda word:word.capitalize()

change_words(l,sample_func)

#直接書くこともできる、20を変える

change_words(l,lambda word: word.capitalize())

