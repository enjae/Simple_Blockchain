//used to generate a 256 bit long key
const SHA256 = require('crypto-js/sha256');


// This class is used to create a Block
class Block{
    constructor (index, timestamp, data, prevHash = ''){

        // this is the number of block starting from 0
        this.index = index; 
        
        // time when block has been mined
        this.timestamp = timestamp; 

        // data inside the block
        this.data = data;
        
        // has of the previous block
        this.prevHash = prevHash;

        //this.hash = ''; // will create a method to calculate the hash
        
        // hash of the block
        this.hash = this.calculateHash();

    }

    // This function will calculate the Hash of the block
    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

//This class is used to create a chain
class Blockchain{
    constructor(){
      this.chain = [this.createGenesis()]; //array of block  
    }
   
    //The first Block is added manually
    createGenesis(){
        return new Block(0, "16/06/2021", "first block", "0" )
    }
 
    //Will Fetch the Last block
    getLastBlock(){
        return this.chain[this.chain.length - 1];
 
    }

    //This function will add a new block to the chain
    addBlock(newBlock){
        newBlock.prevHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }

    //This Function will check if the chain is valid i.e. if the prevhash of current block is same as the hash of prev block tec
    ifValid(){

        //it will start with 1 coz 0 is genesis block
        for(let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.prevHash !== prevBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let enjaec = new Blockchain();
enjaec.addBlock(new Block(1, "17/06/2021", {amount: 789}));
enjaec.addBlock(new Block(2, "17/06/2021", {amount: 359}));

console.log('ifValid? ' + enjaec.ifValid()); //it will tell if the chain is valid or not
console.log(JSON.stringify(enjaec, null, 4)); // it will print the chain made