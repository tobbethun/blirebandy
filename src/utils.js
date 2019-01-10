export const nextMonday = () => {
    const d = new Date();
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7));
    const nextMonday = d.toLocaleDateString("sv-SE");
    return nextMonday;
}

export default nextMonday;
