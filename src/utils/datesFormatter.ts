export const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};