void main() {
  List<int> numbers = [1, 2, 3, 4, 5];

  int sum = 0;
  int largest = numbers[0];

  for (int num in numbers) {
    sum += num;

    if (num > largest) {
      largest = num;
    }
  }
  print("Sum: $sum");
  print("Largest Number: $largest");
}