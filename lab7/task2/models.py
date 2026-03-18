class Animal:
    """Base class for all animals."""

    def __init__(self, name, age, color):
        self.name = name
        self.age = age
        self.color = color

    def speak(self):
        return "..."

    def info(self):
        return f"{self.name} is {self.age} years old and is {self.color}"

    def __str__(self):
        return f"Animal(name={self.name}, age={self.age}, color={self.color})"


class Dog(Animal):
    """Dog class inheriting from Animal."""

    def __init__(self, name, age, color, breed):
        super().__init__(name, age, color)
        self.breed = breed

    def speak(self):
        return "Woof! Woof!"

    def fetch(self):
        return f"{self.name} fetches the ball!"

    def __str__(self):
        return f"Dog(name={self.name}, age={self.age}, breed={self.breed})"


class Cat(Animal):
    """Cat class inheriting from Animal."""

    def __init__(self, name, age, color, indoor):
        super().__init__(name, age, color)
        self.indoor = indoor

    def speak(self):
        return "Meow! Meow!"

    def purr(self):
        return f"{self.name} is purring..."

    def __str__(self):
        return f"Cat(name={self.name}, age={self.age}, indoor={self.indoor})"