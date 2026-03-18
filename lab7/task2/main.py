from models import Animal, Dog, Cat


def main():
    # Create objects
    animal = Animal("Generic Animal", 5, "brown")
    dog = Dog("Buddy", 3, "golden", "Labrador")
    cat = Cat("Whiskers", 4, "white", True)

    # Store in a list
    animals = [animal, dog, cat]

    print("=" * 40)
    print("All Animals:")
    print("=" * 40)

    # Iterate over list
    for a in animals:
        print(a)

    print("\n" + "=" * 40)
    print("Each animal speaks (Polymorphism):")
    print("=" * 40)

    # Demonstrate polymorphism
    for a in animals:
        print(f"{a.name}: {a.speak()}")

    print("\n" + "=" * 40)
    print("Animal Info:")
    print("=" * 40)

    for a in animals:
        print(a.info())

    print("\n" + "=" * 40)
    print("Unique Methods:")
    print("=" * 40)

    # Unique methods
    print(dog.fetch())
    print(cat.purr())


if __name__ == "__main__":
    main()