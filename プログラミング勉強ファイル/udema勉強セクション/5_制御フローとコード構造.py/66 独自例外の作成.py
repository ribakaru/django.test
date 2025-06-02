class UppercaseError(Exception):
    pass

def check():
    words = ['APPLE','orange','banana']
    for word in words:
        if word.isupper():
            raise UnboundLocalError(word)
        
try:
    check()
except UppercaseError as exc:
    print('This is my fault,Go next')
    