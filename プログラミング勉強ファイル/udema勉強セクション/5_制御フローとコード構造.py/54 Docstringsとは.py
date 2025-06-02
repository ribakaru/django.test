def exampe_func(param1,param2):
    """Exampe function with types documented in the docstring.
    
    Args:
        param1(int):The first parameter
        param2(str):The second parameter.
    
    Returns:
        bool:The return value. True for success,False otherwise
    """
    print(param1)
    print(param2)
    return True

print(exampe_func.__doc__)
#  help(exampe_func.)でも可

#ファンクションの意味を最初に書く
#ダブルコート3つでかこんでファンクションを書くことを覚える

