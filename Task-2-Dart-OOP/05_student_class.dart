class Student {
  String name;
  int roll;

  Student(this.name, this.roll);

  void displayDetails() {
    print("Student Name: $name");
    print("Roll Number: $roll");
  }
}

void main() {
  Student s1 = Student("Koushik", 18);
  s1.displayDetails();
}