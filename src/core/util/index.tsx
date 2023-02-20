export const truncateAddr = (adr: string) => {
    return adr.substring(0, 6)  + '...' + adr.substring(adr.length - 5, adr.length - 1);
}