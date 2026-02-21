class Animal {
  void sound() {
    print("Animal makes a sound");
  }
}

class Dog extends Animal {
  @override
  void sound() {
    print("Dog barks: bow bow");
  }
}

void main() {
  Animal a = Animal();
  a.sound();

  Dog d = Dog();
  d.sound();
}