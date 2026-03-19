import json


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

    def to_dict(self):
        return {
            "type": "Animal",
            "name": self.name,
            "age": self.age,
            "color": self.color
        }

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

    def to_dict(self):
        return {
            "type": "Dog",
            "name": self.name,
            "age": self.age,
            "color": self.color,
            "breed": self.breed
        }

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

    def to_dict(self):
        return {
            "type": "Cat",
            "name": self.name,
            "age": self.age,
            "color": self.color,
            "indoor": self.indoor
        }

    def __str__(self):
        return f"Cat(name={self.name}, age={self.age}, indoor={self.indoor})"


def save_animals(animals, filename="data.json"):
    """Save list of animals to JSON file."""
    try:
        # List comprehension — объектілерді сөздікке айналдыру
        data = [animal.to_dict() for animal in animals]
        with open(filename, "w") as f:
            json.dump(data, f, indent=4)
        print(f"✅ Data saved to {filename}")
    except TypeError as e:
        print(f"❌ TypeError: Could not serialize data — {e}")
    finally:
        print("💾 Save operation completed.")


def load_animals(filename="data.json"):
    """Load animals from JSON file."""
    animals = []
    try:
        with open(filename, "r") as f:
            data = json.load(f)

        for item in data:
            animal_type = item.get("type")
            if animal_type == "Dog":
                animals.append(Dog(
                    name=item["name"],
                    age=item["age"],
                    color=item["color"],
                    breed=item["breed"]
                ))
            elif animal_type == "Cat":
                animals.append(Cat(
                    name=item["name"],
                    age=item["age"],
                    color=item["color"],
                    indoor=item["indoor"]
                ))
            elif animal_type == "Animal":
                animals.append(Animal(
                    name=item["name"],
                    age=item["age"],
                    color=item["color"]
                ))
            else:
                raise ValueError(f"Unknown animal type: {animal_type}")

    except FileNotFoundError:
        print(f"❌ FileNotFoundError: data.json file not found!")
    except ValueError as e:
        print(f"❌ ValueError: {e}")
    finally:
        print("📂 Load operation completed.")

    return animals