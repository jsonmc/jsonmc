print("factorial of number input by the user")
num=int(input("enter the number whose factorial is to be calculated:"))
fact=1
while(num>0):
    fact=fact*num
    num=num-1
print(fact)
