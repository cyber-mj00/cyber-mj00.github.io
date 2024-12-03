function displayMvp() {
    document.getElementById("mvp").style.display = "block";
    document.getElementById("maxScore").style.display = "none";
    document.getElementById("avoid4th").style.display = "none";
}

function displayMaxScore() {
    document.getElementById("mvp").style.display = "none";
    document.getElementById("maxScore").style.display = "block";
    document.getElementById("avoid4th").style.display = "none";
}

function displayAvoid4th() {
    document.getElementById("mvp").style.display = "none";
    document.getElementById("maxScore").style.display = "none";
    document.getElementById("avoid4th").style.display = "block";
}