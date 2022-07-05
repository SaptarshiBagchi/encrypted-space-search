class MagicEncryption {
    private static secretNumber = 1
    private static codeLength = 3

    private static chunkCreator(input: string[]) : string[][]{
        const arrays = []

        while (input.length > 0)
         arrays.push(input.splice(0, this.codeLength))
        return arrays

    }   

    public static encode(input : string) : string {
        return input.split('').map(character => {
            const originalUnicode = character.toLowerCase().charCodeAt(0)
            const leftChar = (originalUnicode)%26 - this.secretNumber
            const rightChar = (originalUnicode)%26 + this.secretNumber
            return `${String.fromCharCode(leftChar+originalUnicode)}${character.toLowerCase()}${String.fromCharCode(rightChar + originalUnicode)}`
        }).join('')
    }

    // * Make this encryption more unguessable and this is just for demonstration
    public static decode(input: string): string {
        const splittedInput = input.split('')
        const arrayOfChunks = this.chunkCreator(splittedInput)
        return arrayOfChunks.map(chunk => {
            return chunk[1].toLowerCase()
        }).join('')
    }
}

const encodedString = MagicEncryption.encode("Saptarshi Bagchi")
const encodedStringToSearch = MagicEncryption.encode('bag')
console.log({encodedString, encodedStringToSearch})
const searchedString = new RegExp(encodedStringToSearch).test(encodedString)
console.log(searchedString)

