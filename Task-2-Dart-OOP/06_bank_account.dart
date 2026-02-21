class BankAccount {
  String holderName;
  double balance;

  BankAccount(this.holderName, this.balance);

  void deposit(double amount) {
    balance += amount;
    print("Deposited: $amount");
    print("New Balance: $balance");
  }

  void withdraw(double amount) {
    if (amount > balance) {
      print("Insufficient Balance!");
    } else {
      balance -= amount;
      print("Withdrawn: $amount");
      print("Remaining Balance: $balance");
    }
  }
}

void main() {
  BankAccount acc = BankAccount("Koushik", 10000);

  acc.deposit(5000);
  acc.withdraw(7000);
}