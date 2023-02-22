export const truncateAddr = (adr: string) => {
    return adr.substring(0, 6)  + '...' + adr.substring(adr.length - 5, adr.length - 1);
}

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const to$ = (nb: number): string => {
    return USDollar.format(nb);
}