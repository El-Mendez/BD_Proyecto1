export default (seconds) => {
    const minutes = Math.trunc(seconds / 60).toString();
    seconds = "0" + Math.trunc(seconds % 60).toString();

    return `${minutes}:${seconds.slice(-2)}`
}