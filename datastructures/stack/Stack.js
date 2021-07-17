export default class Stack {

    #stackMemory = [];
    #auxMemory = [];
    #stackTop = -1;
    #auxTop = -1;

    constructor(capacity = 20) {
        this.capacity = capacity;
    }

    isEmpty() {
        return this.#stackTop === -1;
    }

    isFull() {
        return this.#stackTop === (this.capacity - 1);
    }

    push(value) {
        if (this.isFull()) {
            throw new Error("Stackoverflow");
        }
        this.#stackMemory[++this.#stackTop] = value;
        if (this.#auxTop === -1) {
            this.#auxMemory[++this.#auxTop] = value;
        } else {
            let min = this.#auxMemory[this.#auxTop];
            if (value < min) {
                this.#auxMemory[++this.#auxTop] = value;
            }
        }
        return this;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Empty stack.");
        }
        let deletedData = this.#stackMemory[this.#stackTop];
        delete this.#stackMemory[this.#stackTop--];
        if (deletedData === this.#auxMemory[this.#auxTop])
            delete this.#auxMemory[this.#auxTop--];
        return deletedData;
    }

    peek() {
        if(this.isEmpty()) return null;
        return this.#stackMemory[this.#stackTop];
    }

    getMinimum() {
        if(this.isEmpty()) return null;
        return this.#auxMemory[this.#auxTop];
    }

    size() {
        return this.#stackMemory.length;
    }

    toString() {
        return this.#stackMemory.toString();
    }
}