export const generateLeadImageColor = (id: number): string => {
    const colors = ["indigo", "orange", "brand2", "facebook", "teal"];

    return colors[id % 5];
};
