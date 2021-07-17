import LinkedList from "./LinkedList.js";

var newList = new LinkedList();
console.log(newList.insertAtHead(5).toString());
console.log(newList.insertAtLast(10).toString());
console.log(newList.insertAtLast(20).toString());
console.log(newList.insertAtLast(30).toString());
console.log(newList.insertAtLast(40).toString());
console.log(newList.insertAtLast(50).toString());
console.log(newList.insertAt(60, 0).toString());
console.log(newList.insertAt(70, 2).toString());
console.log(newList.toString());
console.log(newList.deleteLast().toString());
console.log(newList.deleteAt(0).toString());
console.log(newList.deleteAt(2).toString());

var ofList = LinkedList.of([1, 2, 3, 4, "Asgard", "Loki", "Captain America", ["Vision","Thor", "Hulk"]]);
console.log(ofList.toString());
console.log(ofList.find('Loki'));
console.log(ofList.reverse().toString());
console.log(ofList.getAt(0));