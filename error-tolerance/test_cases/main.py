# Example of Python File

def divide_numbers(a, b):
    try:
        result = a / b
    except ZeroDivisionError as e:
        print(f"Error: {e}")
    finally:
        print("Execution completed.")

if __name__ == "__main__":
    divide_numbers(10, 0)

    for i in range(5):
        print(f"Loop iteration: {i}")
