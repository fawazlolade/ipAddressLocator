document.getElementById('menubtn').addEventListener('click', () => {
    document.getElementById('navlinks').style.width = "100%";
})

document.getElementById('cancel').addEventListener('click', () => {
    document.getElementById('navlinks').style.width = "0%";
})


document.getElementById("locateBtn").addEventListener("click", () => {
    document.getElementById("ipAddress").focus();
  });

