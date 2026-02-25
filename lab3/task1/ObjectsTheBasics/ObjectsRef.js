// References and copying
let message = "Hello!";
let phrase = message;

alert(message);


let user = { name: "John" };

let admin = user; // copy the reference



admin.name = 'Pete'; // changed by the "admin" reference

alert(user.name); // 'Pete', changes are seen from the "user" reference

let user1 = {
  name: "John",
  age: 30
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user1[key];
}

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object

let user2 = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user2, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
alert(user2.name); // John
alert(user2.canView); // true
alert(user2.canEdit); // true

let user3 = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = structuredClone(user3);

alert( user3.sizes === clone.sizes ); // false, different objects

// user and clone are totally unrelated now
user3.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 50, not related
