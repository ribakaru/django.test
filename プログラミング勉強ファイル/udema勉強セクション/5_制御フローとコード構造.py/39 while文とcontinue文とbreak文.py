#whieとは'～する間に'という意味
count = 0
while count <5:
    print(count)
    count += 1

count = 0
while True:
    if count >=5:
        break
    print(count)
    count +=1
#breakはif文の中に書ける

count = 0
while True:
    if count >=5:
        break

    if count ==2:
        count +=1
        continue

    print(count)
    count += 1
    