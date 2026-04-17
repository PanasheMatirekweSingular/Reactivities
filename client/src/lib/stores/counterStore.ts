import {makeAutoObservable} from 'mobx';

export default class CounterStore {
    title = 'Counter Store';
    count = 3;
    events: string [] = [

    ];

    constructor(){
        makeAutoObservable(this);
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount}- count is now ${this.count}`);

    }

     decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount}- count is now ${this.count}`);
    }

    get eventCounts(){
        return this.events.length;
    }
}