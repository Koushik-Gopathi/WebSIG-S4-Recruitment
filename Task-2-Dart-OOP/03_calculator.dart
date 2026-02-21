void main() {
  double a = 10;
  double b = 20;   
  String operator = "+";   

  double result;

  if (operator == "+") {
    result = a + b;
  } else if (operator == "-") {
    result = a - b;
  } else if (operator == "*") {
    result = a * b;
  } else if (operator == "/") {
    result = a / b;
  } else {
    print("Invalid operator");
    return;
  }

  print("First Number: $a");
  print("Second Number: $b");
  print("Operator: $operator");
  print("Result: $result");
}