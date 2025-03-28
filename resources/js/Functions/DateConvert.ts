export const DateConvert = (deadline: string): string => {
    return `${deadline.slice(0, 4)}-${deadline.slice(4, 6)}-${deadline.slice(6, 8)}`;
};
