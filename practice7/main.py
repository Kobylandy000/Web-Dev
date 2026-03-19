from models import Animal, Dog, Cat, save_animals, load_animals


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
    for a in animals:
        print(a)

    print("\n" + "=" * 40)
    print("Each animal speaks (Polymorphism):")
    print("=" * 40)
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
    print(dog.fetch())
    print(cat.purr())

    # Save to JSON
    print("\n" + "=" * 40)
    print("Saving to data.json:")
    print("=" * 40)
    save_animals(animals)

    # Load from JSON
    print("\n" + "=" * 40)
    print("Loading from data.json:")
    print("=" * 40)
    loaded_animals = load_animals()
    for a in loaded_animals:
        print(f"Loaded: {a} — speaks: {a.speak()}")

    # List comprehension — тек иттерді сүзу
    print("\n" + "=" * 40)
    print("Only Dogs (List Comprehension):")
    print("=" * 40)
    dogs_only = [a for a in loaded_animals if isinstance(a, Dog)]
    for d in dogs_only:
        print(d)


if __name__ == "__main__":
    main()