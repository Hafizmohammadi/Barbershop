
# Bro Code Notes:-

# variable = A container for a value (string, integer, float, boolean)
# A variable behaves as if it was the value it contains
# You can use your variables along with some text by using f-string.
# Typecasting:- the process of converting a variable from one data type to another. str(), int(), float(), bool()
# input():- A function that prompts the user to enter data. Returns the entered data as a string


# Maestro materials:-


# control precision with round(x, n)
# control money format with f"{x:.2f}"
# Use round(x, n) to get a new rounded number without changing the original unless you reassign.
# Use f"{x:.2f}" to display money with exactly two decimal places, like a real receipt.
# Use type() to check what something is (int, float, or str).
# Use str(), int(), and float() to convert values so your operations work.
# SyntaxError → code is written in an invalid way, Python can’t start.
# NameError → using a variable/name that hasn’t been defined.
# TypeError → combining incompatible types (like int + str).
# ValueError → using the right function (like int()), but with a bad value ("twenty", "15 dollars").
#  function is: a named block of code you can run many times without rewriting it.
# once a return runs, nothing after it in that function runs. That’s early return.
# Local variable: created inside a function → exists only inside.
# Global variable: created outside functions → visible everywhere (unless hidden by a local with the same name).
# when a local has the same name as a global (this is called shadowing).
# The local name shadows (hides) the global name inside the function. so it means that the local variable will run
# A safer style is to pass data in as a parameter, so the function doesn’t rely on a name outside. This is the idea of safer data flow with parameters.
# Equality(==) VS Identity(is): 
# == → compare values (what something is as data). is → compare identity (are they literally the same object in memory).
# Use == when you care if two values are the same. Use is only for special cases like checking against None
# range(stop) starts at 0 and stops before stop.
# for loop → when you know how many times to repeat (like range(5)).
# while loop → when you don’t know in advance how many times you’ll need (repeat until some condition changes).
# break means: “stop this loop right now and jump to the code after the loop.”
# lstrip() removes spaces only on the left (start).
  # rstrip() removes spaces only on the right (end).
# replace(old, new) gives you a new string where all occurrences of old are swapped with new.


# def sum(x, y): # This is called function header. And it has the def keyword, function's name, and the lists of perimeters separated by commas
#   return x + y # this line is called body of the function.Everything in body will be run when the function's name called.

# sum(30, 50) # This is called the caller. Because this line is calling the function.
