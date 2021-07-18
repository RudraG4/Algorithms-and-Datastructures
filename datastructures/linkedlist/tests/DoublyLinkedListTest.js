import DoublyLinkedList from "../DoublyLinkedList.js";

const doublyLinkedList = DoublyLinkedList.from(["Boron", "Carbon", "Nitrogen", "Oxygen", "Neon"]);
console.log(doublyLinkedList.toString());
console.log(doublyLinkedList.insertAtHead("Beryllium").toString());
console.log(doublyLinkedList.insertAtHead("Hydrogen").toString());
console.log(doublyLinkedList.insertAtLast("Sodium").toString());
console.log(doublyLinkedList.insertAt("Fluorine", 5).toString());
console.log(doublyLinkedList.insertAtLast("Magnesium").toString());
console.log(doublyLinkedList.deleteHead().toString());
console.log(doublyLinkedList.toString());
console.log(doublyLinkedList.deleteLast().toString());
console.log(doublyLinkedList.toString());
console.log(doublyLinkedList.deleteAt(4).toString());
console.log(doublyLinkedList.toString());
console.log(doublyLinkedList.reverse().toString());
console.log(doublyLinkedList.insertAtLast("Hydrogen").toString());
console.log(doublyLinkedList.delete("Hydrogen").toString());
console.log(doublyLinkedList.toString());
