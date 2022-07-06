class MagicEncryption {
    //The offset count
    private static secretNumber = 1
    private static codeLength = 4

    private static chunkCreator(input: string[]) : string[][]{
        const arrays = []

        while (input.length > 0)
         arrays.push(input.splice(0, this.codeLength))
        return arrays

    }   

    public static encode(input : string) : string {
        return input.split('').map((character, index) => {
            //step 1 : get the original unicode
            const originalUnicode = character.toLowerCase().charCodeAt(0)

            //step 2: derive the left and right characters for distraction
            const leftChar = (originalUnicode)%26 - this.secretNumber
            const rightChar = (originalUnicode)%26 + this.secretNumber

            //step 4: prepare the position variable
            // Get a random number 
            const number = Math.floor(Math.random() * 10)
            if(number % 2 === 0 || number === 0){
                //if even keep the code in the middle
                return `${number}${String.fromCharCode(leftChar+originalUnicode)}${character.toLowerCase()}${String.fromCharCode(rightChar + originalUnicode)}`
            }
            //if odd keep at the last
            return `${number}${String.fromCharCode(leftChar+originalUnicode)}${String.fromCharCode(rightChar + originalUnicode)}${character.toLowerCase()}`
        }).join('')
    }

    // * Make this encryption more unguessable and this is just for demonstration
    public static decode(input: string): string {
        const splittedInput = input.split('')
        const arrayOfChunks = this.chunkCreator(splittedInput)
        return arrayOfChunks.map(chunk => {
            if(parseInt(chunk[0]) % 2 ===0 || parseInt(chunk[0]) === 0) return chunk[2]
            return chunk[3]
        }).join('')
    }
}

const encodedString = MagicEncryption.encode("Saptarshi Bagchi")
const decodedString = MagicEncryption.decode(encodedString)
console.log({encodedString, decodedString})
// const encodedStringToSearch = MagicEncryption.encode('bag')
// console.log({encodedString, encodedStringToSearch})
// const searchedString = new RegExp(encodedStringToSearch).test(encodedString)
// console.log(searchedString)

