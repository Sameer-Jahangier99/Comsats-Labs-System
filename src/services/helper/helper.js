export const dateDisplay = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var deadline = new Date(date);

    return deadline.toLocaleDateString("en-US", options)

}